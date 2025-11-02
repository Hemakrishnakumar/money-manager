import { useTheme, ACCENT_COLORS } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { Moon, Sun, Palette, User } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Settings() {
  const { isDark, toggleTheme, accentColor, setAccentColor } = useTheme();
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');

  const handleSaveProfile = () => {
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Customize your experience</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <Label>Mobile</Label>
                {/* <Input value={user} disabled /> */}
              </div>
              <Button onClick={handleSaveProfile} className="w-full">
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    {isDark ? 'Enabled' : 'Disabled'}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Sun className="w-4 h-4 text-muted-foreground" />
                  <Switch checked={isDark} onCheckedChange={toggleTheme} />
                  <Moon className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Accent Color</Label>
                <div className="grid grid-cols-5 gap-3">
                  {Object.keys(ACCENT_COLORS).map((color) => (
                    <button
                      key={color}
                      onClick={() => {
                        setAccentColor(color);
                        toast.success('Accent color updated!');
                      }}
                      className={`w-full aspect-square rounded-lg transition-all ${
                        accentColor === color
                          ? 'ring-2 ring-offset-2 ring-primary scale-110'
                          : 'hover:scale-105'
                      }`}
                      style={{
                        background: `hsl(${ACCENT_COLORS[color as keyof typeof ACCENT_COLORS]})`,
                      }}
                      aria-label={`Select ${color} color`}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>MoneyAI - AI-Powered Money Management</p>
              <p>Version 1.0.0</p>
              <p>Made with ❤️ using React + TypeScript</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
