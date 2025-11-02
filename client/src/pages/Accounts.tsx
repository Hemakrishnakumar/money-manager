import { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Wallet, CreditCard, PiggyBank, TrendingUp, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const accountIcons = {
  checking: Wallet,
  savings: PiggyBank,
  credit: CreditCard,
  investment: TrendingUp,
};

export default function Accounts() {
  const { accounts, addAccount, deleteAccount } = useData();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState<'checking' | 'savings' | 'credit' | 'investment'>('checking');
  const [balance, setBalance] = useState('');
  const [color, setColor] = useState('blue');

  const handleSubmit = () => {
    if (!name || !balance) {
      toast.error('Please fill all fields');
      return;
    }

    addAccount({
      name,
      type,
      balance: parseFloat(balance),
      color,
    });

    toast.success('Account added successfully!');
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setBalance('');
    setColor('blue');
  };

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Accounts</h1>
          <p className="text-muted-foreground mt-1">Manage your financial accounts</p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Account
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-card">
            <DialogHeader>
              <DialogTitle>Add New Account</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Account Name</Label>
                <Input
                  placeholder="e.g., Main Checking"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Account Type</Label>
                <Select value={type} onValueChange={(v: any) => setType(v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checking">Checking</SelectItem>
                    <SelectItem value="savings">Savings</SelectItem>
                    <SelectItem value="credit">Credit Card</SelectItem>
                    <SelectItem value="investment">Investment</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Current Balance</Label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                />
              </div>

              <Button onClick={handleSubmit} className="w-full">
                Add Account
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Total Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">${totalBalance.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground mt-1">Across all accounts</p>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {accounts.map((account, index) => {
          const Icon = accountIcons[account.type];
          return (
            <motion.div
              key={account.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass-card hover-lift">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{account.name}</CardTitle>
                      <p className="text-xs text-muted-foreground capitalize">
                        {account.type}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      deleteAccount(account.id);
                      toast.success('Account deleted');
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">
                    ${account.balance.toLocaleString()}
                  </p>
                  <p
                    className={`text-sm mt-2 ${
                      account.balance >= 0 ? 'text-success' : 'text-destructive'
                    }`}
                  >
                    {account.balance >= 0 ? 'Positive' : 'Negative'} balance
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}

        {accounts.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No accounts yet</p>
            <p className="text-sm text-muted-foreground">
              Add your first account to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
