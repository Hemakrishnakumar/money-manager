import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserPlus, Users, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const mockFriends = [
  { id: '1', name: 'Sarah Johnson', mobile: '+1 555 0101', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
  { id: '2', name: 'Mike Chen', mobile: '+1 555 0102', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike' },
  { id: '3', name: 'Emma Davis', mobile: '+1 555 0103', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma' },
];

const mockPending = [
  { id: '4', name: 'Alex Turner', mobile: '+1 555 0104', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
];

export default function Friends() {
  const [mobile, setMobile] = useState('');
  const [friends] = useState(mockFriends);
  const [pending] = useState(mockPending);

  const handleInvite = () => {
    if (!mobile || mobile.length < 10) {
      toast.error('Please enter a valid mobile number');
      return;
    }
    toast.success('Invitation sent successfully!');
    setMobile('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Friends</h1>
        <p className="text-muted-foreground mt-1">Connect with friends to share expenses</p>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            Invite Friend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Input
              type="tel"
              placeholder="Enter mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleInvite}>Send Invite</Button>
          </div>
        </CardContent>
      </Card>

      {pending.length > 0 && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Pending Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pending.map((person, index) => (
                <motion.div
                  key={person.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-lg glass-morphism"
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={person.avatar} alt={person.name} />
                      <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{person.name}</p>
                      <p className="text-sm text-muted-foreground">{person.mobile}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => toast.success('Friend request accepted!')}
                    >
                      <Check className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toast.info('Friend request declined')}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            My Friends ({friends.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {friends.map((friend, index) => (
              <motion.div
                key={friend.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-lg glass-morphism hover-lift"
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={friend.avatar} alt={friend.name} />
                    <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{friend.name}</p>
                    <p className="text-sm text-muted-foreground">{friend.mobile}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Split Expense
                </Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
