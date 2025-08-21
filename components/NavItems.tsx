import { Link } from 'react-router';
import { sidebarItems } from '~/constants';
import { NavLink } from 'react-router';
import { cn } from '~/lib/utils';

const NavItems = ({ handleClick }: { handleClick?: () => void }) => {
    const user = {
        name: 'Grey',
        email: 'gray@example.com',
        imageUrl: '/assets/images/david.webp',
    };
    return (
        <section className="nav-items">
            <Link to="/" className="link-logo">
                <img src="/assets/icons/logo.svg" alt="logo" className="size-[30px]" />
                <h1>Travelo</h1>
            </Link>
            <div className="container">
                <nav>
                    {sidebarItems.map(({ id, href, icon, label }) => (
                        <NavLink to={href} key={id}>
                            {({ isActive }: { isActive: boolean }) => (
                                <div
                                    className={cn('group nav-item', {
                                        'bg-primary-100 !text-white': isActive,
                                    })}
                                    onClick={handleClick}
                                >
                                    <img
                                        src={icon}
                                        alt={label}
                                        className={`group-hover:brightness-0 size-0 group-hover:invert ${isActive ? 'brightness-0 invert' : 'text-dark-200'}`}
                                    />
                                    {label}
                                </div>
                            )}
                        </NavLink>
                    ))}
                </nav>
                <footer className="nav-footer">
                    <img
                        src={user?.imageUrl || `/assets/images/david.webp`}
                        alt={user?.name || 'David'}
                    />
                    <article className="flex flex-col">
                        <h2>{user?.name || 'David'}</h2>
                        <p>{user?.email || 'gray@example.com'}</p>
                    </article>
                    <button
                        onClick={() => {
                            console.log('Sign out');
                        }}
                        className="cursor-pointer"
                    >
                        <img src="/assets/icons/logout.svg" alt="Sign out" className="size-6" />
                    </button>
                </footer>
            </div>
        </section>
    );
};

export default NavItems;
