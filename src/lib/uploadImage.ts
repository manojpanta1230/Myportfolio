import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function uploadImage(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Use a root 'uploads' directory outside of public
  const uploadDir = join(process.cwd(), 'uploads');
  
  if (!existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true });
  }

  // Create unique filename
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  const extension = file.name.split('.').pop();
  const filename = `${uniqueSuffix}.${extension}`;
  const filepath = join(uploadDir, filename);

  await writeFile(filepath, buffer);

  // Return the API route URL that will serve this file
  return `/api/uploads/${filename}`;
}
