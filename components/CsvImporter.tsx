import React, { useState, useMemo } from 'react';
import type { Post, SocialPlatform } from '../types';
import { PostStatus } from '../types';

interface CsvImporterProps {
  onClose: () => void;
  onImport: (posts: Post[]) => void;
}

// Provided CSV template content
const csvTemplateContent = `Text,Date,Time,Draft,Facebook,Twitter/X,LinkedIn,GBP,Instagram,Pinterest,TikTok,Youtube,Threads,Bluesky,Picture Url 1,Picture Url 2,Picture Url 3,Picture Url 4,Picture Url 5,Picture Url 6,Picture Url 7,Picture Url 8,Picture Url 9,Picture Url 10,Document title,Shortener,Video Thumbnail Url,Video Cover Frame,Twitter/X Can reply,Twitter/X Type,Twitter/X Poll Duration minutes,Twitter/X Poll Option 1,Twitter/X Poll Option 2,Twitter/X Poll Option 3,Twitter/X Poll Option 4,Pinterest Board,Pinterest Pin Title,Pinterest Pin Link,Pinterest Pin New Format,Instagram Post Type,Instagram Show Reel On Feed,Youtube Video Title,Youtube Video Type,Youtube Video Privacy,Youtube video for kids,Youtube Video Category,Youtube Video Tags,GBP Post Type,Facebook Post Type,Facebook Title,First Comment Text,TikTok Title,TikTok disable comments,TikTok disable duet,TikTok disable stitch,TikTok Post Privacy,TikTok Branded Content,TikTok Your Brand,TikTok Auto Add Music,TikTok Photo Cover Index,TikTok musicId,TikTok title,TikTok author,TikTok startMillis,TikTok durationMillis,TikTok startVideoMillis,LinkedIn Type,LinkedIn Poll Question,LinkedIn Poll Option 1,LinkedIn Poll Option 2,LinkedIn Poll Option 3,LinkedIn Poll Option 4,LinkedIn Poll Duration,LinkedIn Show link preview,LinkedIn Images as Carousel,Threads Reply Control,Brand name
"Example: A post about our new feature! #innovation","2024-08-15","10:30:00",false,true,true,false,false,true,false,false,false,false,false,"https://your-image-url.com/image.png","","","","","","","","","","","true","","","","POST","","","","","","","","","false","POST","true","","VIDEO","PUBLIC",false,"ENTERTAINMENT","new,feature","PUBLICATION","POST","","","Check out our first comment! #engagement",false,false,false,"PUBLIC_TO_EVERYONE",false,false,false,"0","","","","","","","POST","","","","","","ONE_DAY",true,false,"EVERYONE",""
`;

// A simple but effective CSV row parser that handles quoted fields
const parseCsvRow = (row: string): string[] => {
    const result: string[] = [];
    let current = '';
    let inQuote = false;
    for (let i = 0; i < row.length; i++) {
        const char = row[i];
        if (char === '"') {
            inQuote = !inQuote;
        } else if (char === ',' && !inQuote) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    result.push(current.trim());
    return result.map(val => val.startsWith('"') && val.endsWith('"') ? val.slice(1, -1) : val); // remove wrapping quotes
};


const CsvImporter: React.FC<CsvImporterProps> = ({ onClose, onImport }) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleImport = () => {
    if (!file) {
      setError('Please select a file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.split('\n').filter(line => line.trim() !== '');
        if (lines.length < 2) {
          throw new Error('CSV file must contain a header row and at least one data row.');
        }

        const headers = parseCsvRow(lines[0]);
        const platformColumns = headers.filter(h => 
            ['Facebook', 'Instagram', 'X', 'LinkedIn', 'TikTok', 'YouTube'].includes(h) || h === 'Twitter/X'
        );

        // Fix: Explicitly type the return of map to `Post | null` to fix type inference issue.
        const newPosts: Post[] = lines.slice(1).map((rowStr, index): Post | null => {
          const values = parseCsvRow(rowStr);
          const rowData = headers.reduce((obj, header, i) => {
            obj[header] = values[i];
            return obj;
          }, {} as Record<string, string>);

          const date = rowData['Date'];
          const time = rowData['Time'];
          const content = rowData['Text'];
          
          if (!date || !time || !content) {
             console.warn(`Skipping row ${index + 2}: missing required data (Date, Time, or Text).`);
             return null;
          }

          const scheduledAt = new Date(`${date}T${time}`);
          if (isNaN(scheduledAt.getTime())) {
              throw new Error(`Invalid date/time format in row ${index + 2}. Expected YYYY-MM-DD and HH:MM:SS.`);
          }

          const platforms: SocialPlatform[] = platformColumns.reduce((acc, platformHeader) => {
            if (rowData[platformHeader]?.toLowerCase() === 'true') {
              // Handle "Twitter/X" mapping
              const platformName = platformHeader === 'Twitter/X' ? 'X' : platformHeader;
              acc.push(platformName as SocialPlatform);
            }
            return acc;
          }, [] as SocialPlatform[]);

          return {
            id: `csv-${Date.now()}-${index}`,
            scheduledAt,
            content,
            platforms,
            status: rowData['Draft']?.toLowerCase() === 'true' ? PostStatus.Draft : PostStatus.Scheduled,
            mediaUrl: rowData['Picture Url 1'] || undefined,
          };
        // Fix: Use a simpler filter predicate. The `!!p.content` is redundant because of the check inside map.
        }).filter((p): p is Post => p !== null);
        
        onImport(newPosts);
      } catch (err: any) {
        setError(`Failed to parse CSV: ${err.message}`);
      }
    };
    reader.onerror = () => {
        setError('Failed to read the file.');
    };
    reader.readAsText(file);
  };
  
  const templateFileUrl = useMemo(() => {
    const blob = new Blob([csvTemplateContent], { type: 'text/csv;charset=utf-8;' });
    return URL.createObjectURL(blob);
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg m-4">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Import Posts from CSV</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">&times;</button>
        </div>
        <div className="p-6 space-y-4">
            <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Upload a CSV file using the specified template format.</p>
                <p className="text-xs text-gray-500 dark:text-gray-500">Include media by adding a URL (e.g., from Google Drive) in the 'Picture Url 1' column.</p>
                <a 
                    href={templateFileUrl} 
                    download="zenith_social_template.csv"
                    className="mt-2 inline-block text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                    Download Template
                </a>
            </div>
            <div>
                <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 dark:text-gray-300">CSV File</label>
                <input id="file-upload" type="file" accept=".csv" onChange={handleFileChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-indigo-900/50 dark:file:text-indigo-300 dark:hover:file:bg-indigo-900"/>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600">Cancel</button>
          <button onClick={handleImport} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700">Import</button>
        </div>
      </div>
    </div>
  );
};

export default CsvImporter;