import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { Wallet, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login, register, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    navigate('/dashboard');
  }  

  const handleLogin = async () => {
    const success = await login(email, password);
    if (success) {
      toast.success('Login successful!');
      navigate('/dashboard');
    } else {
      toast.error('Login failed. Please try again.');
    }
  };

  const handleRegister = async () => {
    if (!name) {
      toast.error('Please enter your name');
      return;
    }
    const success = await register(name, email, password);
    if (success) {
      toast.success('Registration successful!');
      navigate('/auth/success');
    } else {
      toast.error('Failed to register. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="glass-card rounded-2xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-gradient-primary mx-auto flex items-center justify-center mb-4">
              <Wallet className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold">MoneyAI</h1>            
          </div>

          <Tabs value={isLogin ? 'login' : 'register'} onValueChange={(v) => setIsLogin(v === 'login')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mobile-login">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {(
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-2"
                >
                  <Label htmlFor="otp-login">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={5}
                  />
                </motion.div>
              )}    
              <Button onClick={handleLogin} className="w-full">
                  Login
                </Button>          
            </TabsContent>

            <TabsContent value="register" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}                  
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobile-register">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter you email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}                  
                />
              </div>

              {(
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-2"
                >
                  <Label htmlFor="otp-register">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={5}
                  />
                </motion.div>
              )}

              
                <Button onClick={handleRegister} className="w-full">
                  Register
                </Button>
             
            </TabsContent>
          </Tabs>         
        </div>
      </motion.div>
    </div>
  );
}
