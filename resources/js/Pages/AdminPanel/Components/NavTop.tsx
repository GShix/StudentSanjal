import Dropdown from "@/Components/Dropdown"
import ProfileImage from "@/Pages/Layouts/partials/ProfileImage";
import { PageProps } from "@/types"
import { usePage } from "@inertiajs/react"

const NavTop = () => {
    const {user} = usePage<PageProps>().props.auth;
    // console.log(user)
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
            <li className="nav-item">
                <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars text-[#b99a45] text-lg"></i></a>
            </li>
        </ul>
        <div className="navbar-admin ml-auto font-semibold text-lg">Welcome {user.name}</div>
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <a className="nav-link" data-widget="navbar-search" href="#" role="button">
                <i className="fas fa-search text-[#b99a45] "></i>
                </a>
                <div className="navbar-search-block w-[85%]">
                    <form className="form-inline">
                        <div className="input-group input-group-sm">
                        <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
                        <div className="input-group-append">
                            <button className="btn btn-navbar" type="submit">
                            <i className="fas fa-search"></i>
                            </button>
                            <button className="btn btn-navbar" type="button" data-widget="navbar-search">
                            <i className="fas fa-times"></i>
                            </button>
                        </div>
                        </div>
                    </form>
                </div>
            </li>

            <li className="nav-item dropdown">
                <a className="nav-link" data-toggle="dropdown" href="#">
                <i className="far fa-bell text-[#b99a45]"></i>
                <span className="badge badge-warning navbar-badge">2</span>
                </a>
                <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                <span className="dropdown-item dropdown-header">2 Notifications</span>
                <div className="dropdown-divider"></div>
                <a href="#" className="dropdown-item">
                    <i className="fas fa-envelope mr-2"></i> 4 new messages
                    <span className="float-right text-muted text-sm">3 mins</span>
                </a>
                <div className="dropdown-divider"></div>
                <a href="#" className="dropdown-item">
                    <i className="fas fa-users mr-2"></i> 8 friend requests
                    <span className="float-right text-muted text-sm">12 hours</span>
                </a>
                <div className="dropdown-divider"></div>
                <a href="#" className="dropdown-item dropdown-footer">See All Notifications</a>
                </div>
            </li>
            {/* <li className="nav-item">
                <a className="nav-link" data-widget="fullscreen" href="#" role="button">
                <i className="fas fa-expand-arrows-alt"></i>
                </a>
            </li> */}
            <li className="nav-item">
                <div className="user-icon p-[2px] rounded-full hover:bg-gray-700">
                    <Dropdown>
                        <Dropdown.Trigger>
                        <div className="chat-icon w-10 h-10 p-[3px] bg-black rounded-full relative">
                            {/* <img className="object-cover object-center rounded-full w-full h-full cursor-pointer" src={user.profile_image} alt="" /> */}
                            <img src='/img/icon.png' className="object-cover bg-none object-center rounded-full w-full h-full cursor-pointer"/>
                        </div>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <div className="profile-modal">
                                <div className="chat-icon flex items-center gap-2 mx-2.5 pt-[5px] pb-2 border-b border-gray-400 mb-1">
                                    <div className="image w-10 h-10 rounded-full">
                                        <img className="object-cover object-center rounded-full w-full h-full cursor-pointer" src='/img/icon.png' alt="" />
                                    </div>
                                    <div className="fullname text-gray-900">
                                        <p className="text-sm text-nowrap">{user.name}</p>
                                    </div>
                                </div>
                                {/* <Dropdown.Link href={window.route('profile.edit')} className="mt-2 ">
                                    <i className="ri-settings-4-fill mr-2 bg-gray-300 p-[6px] rounded-full"></i>
                                    Profile Setting
                                </Dropdown.Link> */}
                                <Dropdown.Link href={window.route('admin.logout')} method="post" as="button" className="mt-1">
                                    <i className="ri-logout-box-r-fill mr-2 bg-gray-300 p-[6px] rounded-full"></i>
                                    Log Out
                                </Dropdown.Link>
                            </div>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </li>
        </ul>
    </nav>
  )
}

export default NavTop
