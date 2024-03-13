import {cn} from "~/lib/utils";
import AdminNavItems from '~/components/admin/layout/AdminNavItems';

export default function AdminSidebar() {
    return (
        <nav
            className={cn(`relative hidden h-screen border-r pt-16 lg:block w-72`)}
        >
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <div className="space-y-1">
                        <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight">
                            Admin
                        </h2>

                        <AdminNavItems items={[
                            {
                                title: "Dashboard",
                                href: "/admin",
                                icon: "home",
                            },
                            {
                                title: "Users",
                                href: "/admin/users",
                                icon: "users",
                            }
                        ]}/>
                    </div>
                </div>
            </div>
        </nav>
    );
}