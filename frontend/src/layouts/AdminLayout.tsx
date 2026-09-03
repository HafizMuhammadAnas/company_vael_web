import { Link, Outlet } from "react-router-dom";

import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";

import styles from "./AdminLayout.module.css";

export function AdminLayout() {
  const { user, logout } = useAuth();

  return (
    <div className={styles.admin}>
      <header className={styles.header}>
        <Link to="/admin/leads" className={styles.brand}>
          VAELKODE Admin
        </Link>
        <div className={styles.meta}>
          {user && (
            <span>
              {user.email} · {user.role}
            </span>
          )}
          <Button variant="outline" onClick={logout}>
            Log out
          </Button>
        </div>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
