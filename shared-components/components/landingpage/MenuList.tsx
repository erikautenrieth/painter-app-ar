import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import Link from "next/link";
import {useAuth} from "../../services/auth-context";

export default function MenuList() {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const { user, login, logOut } = useAuth();
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<Button
				id="fade-button"
				aria-controls={open ? 'fade-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
				variant="contained"
				size={"large"}
			>
				Menu
			</Button>
			<Menu
				id="fade-menu"
				MenuListProps={{
					'aria-labelledby': 'fade-button',
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				TransitionComponent={Fade}
			>
				<MenuItem onClick={handleClose} divider={true} selected={true}>
					<Link href="/landingpage">
					<a className="" >
						<h1>Landingpage</h1>
					</a>
				</Link></MenuItem>
				<MenuItem onClick={handleClose}  divider={true}>	{(user.email == null)  && <Link href="/login">
					<a className="">Login</a>
				</Link>}</MenuItem>
				<MenuItem onClick={handleClose}  divider={true}>{user.email != null && <Link href="/home">
					<a className="">Home</a>
				</Link>}</MenuItem>

				<MenuItem onClick={handleClose}>
					{user.email != null && <Link href="/landingpage">
						<a onClick={logOut} className="">
							Logout </a>
					</Link>}

				</MenuItem>
			</Menu>
		</div>
	);
}