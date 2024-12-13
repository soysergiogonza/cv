import { ProfileNavigation } from '../ProfileNavigation/index';

export function Profile({
 profile,
 currentProfile,
 currentProfileIndex,
 totalProfiles,
 setCurrentProfileIndex,
 t,
}: any) {
 if (!currentProfile || totalProfiles === 0) {
  return (
   <section className='space-y-4 group'>
    <h2 className='text-2xl font-semibold tracking-tight'>
     {profile('sectionTitle')}
    </h2>
    <div className='text-muted-foreground space-y-4 flex-1'>
     <p className='text-pretty'>No hay perfiles disponibles.</p>
    </div>
   </section>
  );
 }

 return (
  <section className='space-y-4 group'>
   <h2 className='text-2xl font-semibold tracking-tight'>
    {profile('sectionTitle')} - {currentProfile.title}
   </h2>
   <div className='text-muted-foreground space-y-4 flex-1'>
    {currentProfile.content.map((paragraph: string) => (
     <p key={paragraph} className='text-pretty'>
      {paragraph}
     </p>
    ))}
   </div>

   {totalProfiles > 1 && (
    <ProfileNavigation
     totalProfiles={totalProfiles}
     currentProfile={currentProfileIndex}
     onProfileChange={setCurrentProfileIndex}
     t={t}
     date={currentProfile.date}
     company={currentProfile.company}
    />
   )}
  </section>
 );
}
