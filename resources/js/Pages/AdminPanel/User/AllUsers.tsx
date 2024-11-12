import { Head } from "@inertiajs/react"
import AdminDashboardLayout from "../Layouts/AdminDashboardLayout"

const AllUsers = () => {
  return (
    <AdminDashboardLayout>
        <Head title="All Users"/>
        <div className="allUsers">
            <h1>Users</h1>
            <div className="container full-container py-5 flex flex-col gap-6">
                <div className="card flex items-center p-5">
                    <nav className=" w-full  flex items-center justify-between" aria-label="Global">
                        <ul className="icon-nav flex items-center gap-4">
                            <li className="relative xl:hidden">
                                <a className="text-xl  icon-hover cursor-pointer text-heading" id="headerCollapse"
                                    data-hs-overlay="#application-sidebar-brand" aria-controls="application-sidebar-brand"
                                    aria-label="Toggle navigation" href="javascript:void(0)">
                                    <i className="ti ti-menu-2 relative z-1"></i>
                                </a>
                            </li>

                            <li className="relative">
                                <nav className="w-full rounded-md" aria-label="breadcrumb">
                                    <ol className="list-reset ms-2 flex">
                                        <li>
                                            <a href="{{ route('admin.dashboard') }}"
                                                className="motion-reduce:transition-none-none text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition motion-reduce:transition-none ">Home</a>
                                        </li>
                                        <li>
                                            <span className="mx-2 text-black/60">/</span>
                                        </li>
                                        <li>
                                            <a href={ window.route('admin.farmer.index') }
                                                className="motion-reduce:transition-none-none text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition motion-reduce:transition-none ">Farmer List</a>
                                        </li>
                                        <li>
                                            <span className="mx-2 text-black/60">/</span>
                                        </li>
                                        <li>
                                            <a href="#"
                                                className="motion-reduce:transition-none-none text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition motion-reduce:transition-none">Data</a>
                                        </li>
                                    </ol>
                                </nav>
                            </li>
                        </ul>
                        <div className="flex items-center gap-4">
                            <a href="{{ route('admin.farmer.create') }}"
                                className="btn font-medium bg-blue-600 hover:bg-red-600 py-2 text-white" aria-current="page">Add New</a>
                        </div>
                    </nav>
                </div>

                <div className="col-lg-12 overflow-hidden d-flex align-items-stretch">
                    <div className="card w-100">
                        <div className="card-body p-4">
                            <h5 className="card-title fw-semibold mb-4">Farmer</h5>
                            <div className="table-responsive">
                                <table className="table text-nowrap mb-0 align-middle">
                                    <thead className="text-dark fs-4">
                                        <tr className="border border-1">
                                            <th>
                                                <h6 className="fw-semibold mb-0">S.No.</h6>
                                            </th>
                                            <th className="border-right-1">
                                                <h6 className="fw-semibold mb-0">ID</h6>
                                            </th>
                                            <th className="border-right-1">
                                                <h6 className="fw-semibold mb-0">Photo</h6>
                                            </th>
                                            <th className="border-right-1">
                                                <h6 className="fw-semibold mb-0">Name</h6>
                                            </th>
                                            <th className="border-right-1">
                                                <h6 className="fw-semibold mb-0">Phone Number</h6>
                                            </th>
                                            <th className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0">Action</h6>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* @foreach ($farmers as $farmer)
                                            <tr>
                                                <td>
                                                    <h6>{{ $loop->iteration }}</h6>
                                                </td>
                                                <td>
                                                    <h6>{{ $farmer->unique_id ?? '' }}</h6>
                                                </td>
                                                <td>
                                                    <img className="mb-1 w-20"src="{{ $farmer->photo ?? '' }}" alt="Farmer's Photo"/>
                                                </td>
                                                <td>
                                                    <h6>{{ $farmer->name ?? '' }}</h6>
                                                </td>
                                                <td>
                                                    <h6>{{ $farmer->phone_no ?? '' }}</h6>
                                                </td>
                                                <td>
                                                    <div className="action gap-2 flex items-center">
                                                        <a href="{{ route('admin.farmer.edit', $farmer) }}"><i
                                                                className="ti ti-edit text-[18px] text-white hover:bg-blue-500 bg-green-500 p-2 rounded-full"></i></a>

                                                        <form action="{{ route('admin.farmer.destroy', $farmer) }}"
                                                            method="POST" className="inline-block">
                                                            @csrf
                                                            @method('DELETE')
                                                            <button type="submit">
                                                                <i
                                                                    className="ti ti-trash ti ti-trash text-[18px] text-white hover:bg-blue-500 bg-red-500 p-2 rounded-full"></i>
                                                            </button>
                                                        </form>
                                                    </div>
                                                </td>
                                            </tr>
                                        @endforeach */}

                                    </tbody>

                                </table>
                                {/* {{-- <div className="mt-4">
                                    {{ $farmer->onEachSide(5)->links('vendor.pagination.bootstrap-5') }}
                                </div> --}} */}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </AdminDashboardLayout>
  )
}

export default AllUsers
