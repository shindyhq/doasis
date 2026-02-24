import { format } from 'date-fns';

interface WelcomeHeaderProps {
  userName: string;
}

export function WelcomeHeader({ userName }: WelcomeHeaderProps) {
  const currentDate = format(new Date(), 'EEEE, MMMM do');

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-light text-slate-900 mb-2">
        Welcome back, <span className="font-medium text-teal-600">{userName}</span>.
      </h1>
      <p className="text-slate-500 font-light mb-4">{currentDate}</p>
      
      <div className="bg-purple-50 border border-purple-100 rounded-2xl p-6 italic text-purple-800 font-serif text-lg leading-relaxed shadow-sm">
        "I am deserving of peace and the space to heal at my own pace."
      </div>
    </div>
  );
}
