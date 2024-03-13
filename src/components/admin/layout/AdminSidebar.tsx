import {cn} from "~/lib/utils";
import AdminNavItems from '~/components/admin/layout/AdminNavItems';
import {NAV_ITEMS} from '~/data/nav-items';

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

                        <AdminNavItems items={NAV_ITEMS}/>
                    </div>
                </div>
            </div>
        </nav>
    );
}