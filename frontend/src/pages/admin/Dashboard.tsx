import { Link, Outlet } from 'react-router-dom'
import {
	File,
	Home,
	LineChart,
	ListFilter,
	MoreHorizontal,
	Package,
	Package2,
	PanelLeft,
	PlusCircle,
	Search,
	Settings,
	ShoppingCart,
	Users2,
} from 'lucide-react'

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import Sidebar from '@/components/pages/admin/Sidebar'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function Dashboard() {
	return (
		<div className='flex flex-col w-full min-h-screen bg-muted/40'>
			<Sidebar />
			<div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
				<header className='sticky top-0 z-30 flex items-center gap-4 px-4 border-b h-14 bg-background sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6'>
					<Sheet>
						<SheetTrigger asChild>
							<Button size='icon' variant='outline' className='sm:hidden'>
								<PanelLeft className='w-5 h-5' />
								<span className='sr-only'>Toggle Menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent side='left' className='sm:max-w-xs'>
							<nav className='grid gap-6 text-lg font-medium'>
								<Link
									to=''
									className='flex items-center justify-center w-10 h-10 gap-2 text-lg font-semibold rounded-full group shrink-0 bg-primary text-primary-foreground md:text-base'>
									<Package2 className='w-5 h-5 transition-all group-hover:scale-110' />
									<span className='sr-only'>Acme Inc</span>
								</Link>
								<Link
									to=''
									className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'>
									<Home className='w-5 h-5' />
									Dashboard
								</Link>
								<Link
									to=''
									className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'>
									<ShoppingCart className='w-5 h-5' />
									Orders
								</Link>
								<Link
									to=''
									className='flex items-center gap-4 px-2.5 text-foreground'>
									<Package className='w-5 h-5' />
									Products
								</Link>
								<Link
									to=''
									className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'>
									<Users2 className='w-5 h-5' />
									Customers
								</Link>
								<Link
									to=''
									className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'>
									<LineChart className='w-5 h-5' />
									Settings
								</Link>
							</nav>
						</SheetContent>
					</Sheet>
					<Breadcrumb className='hidden md:flex'>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbLink asChild>
									<Link to=''>Dashboard</Link>
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbLink asChild>
									<Link to=''>Products</Link>
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbPage>All Products</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
					<div className='relative flex-1 ml-auto md:grow-0'>
						<Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
						<Input
							type='search'
							placeholder='Search...'
							className='w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]'
						/>
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant='outline'
								size='icon'
								className='overflow-hidden rounded-full'>
								<img
									src='/placeholder-user.jpg'
									width={36}
									height={36}
									alt='Avatar'
									className='overflow-hidden'
								/>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Settings</DropdownMenuItem>
							<DropdownMenuItem>Support</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Logout</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</header>
				<Outlet />
			</div>
		</div>
	)
}
