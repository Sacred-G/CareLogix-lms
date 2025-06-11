import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { DomainStats } from '@/types/admin';
import { Users, BookOpen, Medal, BarChart3 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface DomainManagementProps {
  domainStats: DomainStats[] | undefined;
  loadingDomainStats: boolean;
  adminType: string | null;
  onAddDomainAdmin: (domain: string) => void;
}

export default function DomainManagement({
  domainStats = [],
  loadingDomainStats,
  adminType,
  onAddDomainAdmin
}: DomainManagementProps) {
  // Filter out any null/undefined domain stats first
  const filteredDomainStats = React.useMemo(() => {
    const filtered = domainStats?.filter(stat => {
      const isValid = stat && stat.domain;
      if (!isValid) {
        console.log('[DOMAIN_MGMT] Filtering out invalid domain stat:', stat);
      }
      return isValid;
    }) || [];
    
    console.log('[DOMAIN_MGMT] Filtered domain stats:', filtered);
    return filtered;
  }, [domainStats]);

  // Calculate totals based on filtered domain stats
  const { totalDomains, totalUsers, totalAdmins, totalEnrollments } = React.useMemo(() => {
    const totals = {
      totalDomains: filteredDomainStats.length,
      totalUsers: 0,
      totalAdmins: 0,
      totalEnrollments: 0
    };
    
    filteredDomainStats.forEach(domain => {
      totals.totalUsers += domain.userCount || 0;
      totals.totalAdmins += domain.adminCount || 0;
      totals.totalEnrollments += domain.enrollmentCount || 0;
    });
    
    console.log('[DOMAIN_MGMT] Calculated totals:', totals);
    return totals;
  }, [filteredDomainStats]);
  
  // Debug log the received props
  React.useEffect(() => {
    console.log('[DOMAIN_MGMT] Received domain stats:', {
      domainStats,
      filteredDomainStats,
      adminType,
      loading: loadingDomainStats,
      timestamp: new Date().toISOString()
    });
  }, [domainStats, filteredDomainStats, adminType, loadingDomainStats]);
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Domain Management</CardTitle>
        <CardDescription>
          {adminType === 'super_admin' 
            ? 'Overview of all domains in the system' 
            : 'Overview of your managed domains'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loadingDomainStats ? (
          <div className="space-y-2">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        ) : domainStats && domainStats.length > 0 ? (
          <div className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <Card className="bg-card">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Domains</p>
                      <p className="text-2xl font-bold text-foreground">
                        {loadingDomainStats ? <Skeleton className="h-8 w-12" /> : totalDomains}
                      </p>
                    </div>
                    <div className="p-2 bg-primary/10 rounded-full">
                      <BarChart3 className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-card">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                      <p className="text-2xl font-bold text-foreground">
                        {loadingDomainStats ? <Skeleton className="h-8 w-12" /> : totalUsers}
                      </p>
                    </div>
                    <div className="p-2 bg-blue-500/10 rounded-full">
                      <Users className="h-6 w-6 text-blue-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-card">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Admins</p>
                      <p className="text-2xl font-bold text-foreground">
                        {loadingDomainStats ? <Skeleton className="h-8 w-12" /> : totalAdmins}
                      </p>
                    </div>
                    <div className="p-2 bg-amber-500/10 rounded-full">
                      <Medal className="h-6 w-6 text-amber-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-card">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Enrollments</p>
                      <p className="text-2xl font-bold text-foreground">
                        {loadingDomainStats ? <Skeleton className="h-8 w-12" /> : totalEnrollments}
                      </p>
                    </div>
                    <div className="p-2 bg-teal-500/10 rounded-full">
                      <BookOpen className="h-6 w-6 text-teal-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Domain</TableHead>
                  <TableHead>Users</TableHead>
                  <TableHead>Admins</TableHead>
                  <TableHead>Enrollments</TableHead>
                  <TableHead>Completion Rate</TableHead>
                  {adminType === 'super_admin' && <TableHead className="text-right">Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDomainStats.length === 0 && !loadingDomainStats ? (
              <TableRow>
                <TableCell colSpan={adminType === 'super_admin' ? 6 : 5} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center">
                    <BarChart3 className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">
                      {adminType === 'super_admin' 
                        ? 'No domains found' 
                        : 'You do not have any domains to manage'}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredDomainStats.map((domain) => (
                  <TableRow key={domain.domain}>
                    <TableCell className="font-medium">{domain.domain}</TableCell>
                    <TableCell>{domain.userCount}</TableCell>
                    <TableCell>{domain.adminCount}</TableCell>
                    <TableCell>{domain.enrollmentCount}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={domain.completionRate * 100} className="h-2" />
                        <span className="text-xs">{Math.round(domain.completionRate * 100)}%</span>
                      </div>
                    </TableCell>
                    {adminType === 'super_admin' && (
                      <TableCell className="text-right">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => onAddDomainAdmin(domain.domain)}
                        >
                          Add Domain Admin
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <BarChart3 className="h-10 w-10 text-muted-foreground mb-2" />
            <h3 className="text-lg font-semibold">No Domains Found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {adminType === 'super_admin' 
                ? 'There are no domains in the system yet.' 
                : 'You do not have any managed domains.'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
