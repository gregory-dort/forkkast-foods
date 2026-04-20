import { useAuth } from '../hooks/useAuth';

type HeroProps = {
    scrollToSchedule: () => void;
}

const Hero = ({scrollToSchedule }: HeroProps) => {
    const { user } = useAuth();

    const today = new Date();
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    }).format(today);

    return (
        <div className="bg-cream flex flex-row mt-16 p-6">
            <div className="w-1/2 mx-auto px-4">
                <h1 className="text-4xl font-serif font-bold text-warm-brown mb-4">Welcome Back, {user?.name}!</h1>
                <p className="text-xl mb-8 font-serif font-bold text-charcoal">Today is: {formattedDate}</p>
            </div>
            <div className='w-1/2 flex flex-col'>
                {/* Small Meals Card Here */}
                <div className='container mx-auto py-4 mb-8'>

                </div>
                {/* Schedule for the current day with a button to look at schedule for the week */}
                <div className='container mx-auto py-4'>
                    <button onClick={scrollToSchedule} className='bg-forest-green hover:bg-deep-green text-warm-brown font-serif py-2 px-4 rounded-md shadow-md'>
                        View Schedule for This Week
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Hero;