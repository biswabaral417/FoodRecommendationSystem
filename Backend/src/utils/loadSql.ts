import fs from 'fs';
import path from 'path';

export const loadSQL = (filename: string): string => {
    return fs.readFileSync(path.join(__dirname, 'sql', filename), 'utf-8');
};
