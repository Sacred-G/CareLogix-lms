
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Menu } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export default function Header() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const { data: isAdmin } = useQuery({
    queryKey: ['isAdmin', user?.id],
    queryFn: async () => {
      if (!user) return false;
      const { data, error } = await supabase.rpc('is_admin');
      if (error) {
        console.error('Error checking admin status:', error);
        return false;
      }
      return data;
    },
    enabled: !!user,
  });

  const handleLogout = async () => {
    await signOut();
    navigate('/auth');
  };

  // Get user initials for avatar
  const getInitials = () => {
    if (!user) return 'U';

    const emailInitial = user.email?.[0]?.toUpperCase() || '';
    return emailInitial;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            {/* Using a simple div for the logo for now, could be replaced with an SVG */}
            <div className="w-8 h-8 rounded-md bg-gradient-primary text-primary-foreground flex items-center justify-center font-bold shadow-md">CL</div>
            <span className="font-heading font-bold text-xl hidden sm:inline-block text-gradient-primary">
  {user && user.email ?
    `${user.email.split('@')[1]?.split('.')[0]?.charAt(0).toUpperCase() + user.email.split('@')[1]?.split('.')[0]?.slice(1)} University`
    : 'CareLogix LMS'}
</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="nav-home text-sm font-medium hover:text-primary transition-colors">Home</Link>
          <Link to="/courses" className="nav-courses text-sm font-medium hover:text-primary transition-colors">Courses</Link>
          <Link to="/dashboard" className="nav-dashboard text-sm font-medium hover:text-primary transition-colors">Dashboard</Link>
          <Link to="/extras" className="nav-extras text-sm font-medium hover:text-primary transition-colors">Extras</Link>
          {isAdmin && (
            <Link to="/admin/dashboard" className="text-sm font-medium hover:text-primary transition-colors">Admin</Link>
          )}
        </nav>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5 text-foreground" /> {/* Ensure icon color is visible */}
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-card text-card-foreground border-border"> {/* Apply card styles */}
              <DropdownMenuItem asChild>
                <Link to="/">Home</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/courses">Courses</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/dashboard">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/extras">Extras</Link>
              </DropdownMenuItem>
              {isAdmin && (
                <DropdownMenuItem asChild>
                  <Link to="/admin/dashboard">Admin Dashboard</Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="user-profile relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground shadow-md">{getInitials()}</AvatarFallback> {/* Apply gradient to avatar fallback */}
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-card text-card-foreground border-border" align="end" forceMount> {/* Apply card styles */}
              <DropdownMenuItem asChild>
                <Link to="/profile">My Profile</Link>
              </DropdownMenuItem>
              {isAdmin && (
                <DropdownMenuItem asChild>
                  <Link to="/admin/dashboard">Admin Dashboard</Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
