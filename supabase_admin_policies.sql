-- Policy to allow admins to insert projects
create policy "Admins can insert projects"
  on projects
  for insert
  with check (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.tier = 'admin'
    )
  );

-- Policy to allow admins to update projects
create policy "Admins can update projects"
  on projects
  for update
  using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.tier = 'admin'
    )
  );

-- Policy to allow admins to delete projects
create policy "Admins can delete projects"
  on projects
  for delete
  using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.tier = 'admin'
    )
  );
