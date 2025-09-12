-- Create RLS policies for public access to reports storage bucket
CREATE POLICY "Anyone can view reports" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'reports');

-- Allow public access to reports bucket objects  
CREATE POLICY "Public can access reports objects" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'reports' AND auth.role() = 'anon');