import StoreLogo from '@/assets/logo.png'
import useAuth from '@/hooks/useAuth'
import { axiosPrivate } from '@/utils/api/axios'
import { CircleUser, Menu, Search } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import Cart from '../Cart'
import { Button } from '../ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Input } from '../ui/input'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'

const Header = () => {
	const { auth, setAuth } = useAuth()
	const handleLogOut = () => {
		setAuth(null)
		axiosPrivate
			.post('/auth/logout')

			.then(() => {
				setAuth(null)
				localStorage.removeItem('auth')
				localStorage.removeItem('token')
				window.location.href = '/'
			})
	}
	return (
		<header className='sticky top-0 flex items-center h-16 gap-4 px-4 border-b bg-background md:px-6 z-20 shadow-xl '>
			<nav className='flex-col hidden gap-6 text-lg font-medium transition-colors md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
				<NavLink
					to=''
					className='flex items-center w-16 gap-2 font-semibold aspect-square md:text-base'>
					<img src={StoreLogo} alt='Store Logo' className='' />
					<span className='sr-only'>Store Logo</span>
				</NavLink>
				<NavLink
					to='products'
					className={({ isActive }) =>
						isActive
							? 'text-foreground hover:text-foreground'
							: 'text-muted-foreground hover:text-foreground'
					}>
					Products
				</NavLink>
			</nav>
			<Sheet>
				<SheetTrigger asChild>
					<Button variant='outline' size='icon' className='shrink-0 md:hidden'>
						<Menu className='w-5 h-5' />
						<span className='sr-only'>Toggle navigation menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side='left'>
					<nav className='grid gap-6 text-lg font-medium'>
						<NavLink
							to=''
							className='flex items-center w-20 gap-2 font-semibold aspect-square md:text-base'>
							<img src='./logo.png' alt='Acme Inc' className='' />
							<span className='sr-only'>Store Logo</span>
						</NavLink>
						<NavLink
							to='/products'
							className={({ isActive }) =>
								isActive
									? 'text-foreground hover:text-foreground'
									: 'text-muted-foreground hover:text-foreground'
							}>
							Products
						</NavLink>
						<NavLink
							to='/caregories/'
							end
							className={({ isActive }) =>
								isActive
									? 'text-foreground hover:text-foreground'
									: 'text-muted-foreground hover:text-foreground'
							}>
							Categories
						</NavLink>
						<NavLink
							to='/sales/'
							end
							className={({ isActive }) =>
								isActive
									? 'text-foreground hover:text-foreground'
									: 'text-muted-foreground hover:text-foreground'
							}>
							Sales
						</NavLink>
					</nav>
				</SheetContent>
			</Sheet>
			<div className='flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4'>
				{auth ? <Cart /> : <div className='ml-auto'></div>}
				<form className='flex-1 sm:flex-initial'>
					<div className='relative'>
						<Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
						<Input
							type='search'
							placeholder='Search products...'
							className='pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]'
						/>
					</div>
				</form>
				<DropdownMenu>
					{auth ? (
						<DropdownMenuTrigger asChild>
							<Button variant='secondary' size='icon' className='rounded-full'>
								<CircleUser className='w-5 h-5' />
								<span className='sr-only'>Toggle user menu</span>
							</Button>
						</DropdownMenuTrigger>
					) : (
						<Link
							to='/login'
							className='text-muted-foreground hover:text-foreground'>
							Login
						</Link>
					)}

					<DropdownMenuContent align='end'>
						<DropdownMenuLabel>My Account</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Settings</DropdownMenuItem>
						<DropdownMenuItem>Support</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<Button
								variant='outline'
								className='w-full'
								onClick={handleLogOut}>
								Logout
							</Button>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	)
}

export default Header
