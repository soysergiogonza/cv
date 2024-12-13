interface AchievementProps {
  metric: string;
  description: string;
}

export function Achievement({ metric, description }: AchievementProps) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="font-semibold text-primary">{metric}</span>
      <span className="text-muted-foreground">{description}</span>
    </div>
  );
}

// Uso:
<Achievement 
  metric="40%"
  description="mejora en el rendimiento de la aplicación"
/> 