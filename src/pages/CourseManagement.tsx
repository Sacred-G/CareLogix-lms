
import React, { useState } from 'react';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import { AdminRoute } from '@/components/auth/AdminRoute';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CreateCourse from '@/components/admin/CreateCourse';
import ManageCourses from '@/components/admin/ManageCourses';

export default function CourseManagement() {
  return (
    <AdminRoute>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 bg-muted/30 py-8">
          <div className="container px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">Course Management</h1>
                <p className="text-muted-foreground">Create and manage courses, modules, and quizzes</p>
              </div>
            </div>
            
            <Tabs defaultValue="create" className="w-full">
              <TabsList className="grid grid-cols-2 w-full mb-6 max-w-md">
                <TabsTrigger value="create">Create Course</TabsTrigger>
                <TabsTrigger value="manage">Manage Courses</TabsTrigger>
              </TabsList>
              
              {/* Create Course Tab */}
              <TabsContent value="create">
                <CreateCourse />
              </TabsContent>
              
              {/* Manage Courses Tab */}
              <TabsContent value="manage">
                <ManageCourses />
              </TabsContent>
            </Tabs>
          </div>
        </main>
        
        <Footer />
      </div>
    </AdminRoute>
  );
}
