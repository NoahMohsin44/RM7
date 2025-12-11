-- Policy to allow admins to update ANY profile (to change tiers)
create policy "Admins can update any profile"
  on profiles
  for update
  using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.tier = 'admin'
    )
  );
