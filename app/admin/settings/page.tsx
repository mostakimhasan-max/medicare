import { Card, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Globe,
  Lock,
  Bell,
  Database,
  Mail,
  Shield,
  Palette,
} from 'lucide-react';

interface SettingsGroup {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
}

const SETTINGS_GROUPS: SettingsGroup[] = [
  { id: 'general', icon: <Globe size={20} />, title: 'General', description: 'Hospital name, timezone, language, and locale preferences.' },
  { id: 'security', icon: <Lock size={20} />, title: 'Security', description: 'Password policy, 2FA, session timeouts, and access controls.' },
  { id: 'notifications', icon: <Bell size={20} />, title: 'Notifications', description: 'Email, SMS, and in-app notification preferences.' },
  { id: 'backup', icon: <Database size={20} />, title: 'Data & Backup', description: 'Backup schedules, retention policies, and data export.', badge: 'Scheduled daily' },
  { id: 'email', icon: <Mail size={20} />, title: 'Email / SMTP', description: 'Outbound email server configuration and templates.' },
  { id: 'roles', icon: <Shield size={20} />, title: 'Roles & Permissions', description: 'Fine-grained RBAC configuration per role.' },
  { id: 'appearance', icon: <Palette size={20} />, title: 'Appearance', description: 'Theme colors, logo, and white-labeling options.' },
];

export default function AdminSettingsPage() {
  return (
    <div className="space-y-4 max-w-2xl">
      <p className="text-sm text-slate-500">
        Configure system-wide settings. Changes take effect immediately.
      </p>

      <div className="space-y-3">
        {SETTINGS_GROUPS.map((group) => (
          <Card
            key={group.id}
            className="flex items-center gap-4 cursor-pointer hover:border-blue-200 hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors flex-shrink-0">
              {group.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <CardTitle className="text-sm">{group.title}</CardTitle>
                {group.badge && (
                  <Badge variant="success" className="text-[10px]">
                    {group.badge}
                  </Badge>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{group.description}</p>
            </div>
            <span className="text-slate-300 group-hover:text-blue-400 text-lg">›</span>
          </Card>
        ))}
      </div>
    </div>
  );
}
