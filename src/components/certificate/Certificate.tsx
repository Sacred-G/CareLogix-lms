
import React from 'react';
import { format } from 'date-fns';
import { Certificate as CertificateType } from '@/data/courseTypes';
import { Card } from '@/components/ui/card';
import { Award, Medal, CheckCheck, FileSignature } from 'lucide-react';

interface CertificateProps {
  certificate: CertificateType;
  onDownload?: () => void;
  preview?: boolean;
}

const Certificate = ({ certificate, onDownload, preview = false }: CertificateProps) => {
  const formattedIssueDate = format(new Date(certificate.issueDate), 'MMMM dd, yyyy');
  const formattedCompletionDate = format(new Date(certificate.completionDate), 'MMMM dd, yyyy');
  const validUntil = certificate.validUntil ? format(new Date(certificate.validUntil), 'MMMM dd, yyyy') : null;
  
  return (
    <div className={`certificate-container ${preview ? 'max-w-3xl mx-auto' : 'w-full'}`}>
      <Card className="certificate bg-white text-gray-800 p-8 border-4 border-lms-teal-600/20 relative overflow-hidden shadow-lg">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMwMDAiIGQ9Ik0zNiAxOGMxLjIzIDAgMi4zMTIuNDYgMy4wODcgMS4zMjVBNC43MzYgNC43MzYgMCAwIDEgNDAuNSAyMi41YzAgMS4yNi0uNDcgMi4zOC0xLjQxMyAzLjE3NUE0LjY5IDQuNjkgMCAwIDEgMzYgMjdjLTEuMjMgMC0yLjMxMi0uNDYtMy4wODctMS4zMjVBNC43MzYgNC43MzYgMCAwIDEgMzEuNSAyMi41YzAtMS4yNi40Ny0yLjM4IDEuNDEzLTMuMTc1QTQuNjkgNC42OSAwIDAgMSAzNiAxOHptMTguNSA5YzEuMzggMCAyLjYzLjU2IDMuNTM2IDEuNDY1Ljk0NS45MjUgMS40NjUgMi4xNTUgMS40NjUgMy41MzVzLS41MiAyLjYxLTEuNDY1IDMuNTM1Yy0uOTA1LjkwNS0yLjE1NyAxLjQ2NS0zLjUzNiAxLjQ2NXMtMi42My0uNTYtMy41MzYtMS40NjVjLS45NDUtLjkyNS0xLjQ2NS0yLjE1NS0xLjQ2NS0zLjUzNXMuNTItMi42MSAxLjQ2NS0zLjUzNWMuOTA1LS45MDUgMi4xNTctMS40NjUgMy41MzYtMS40NjV6TTQgMzZjMS4zOCAwIDIuNjMuNTYgMy41MzYgMS40NjUuOTQ1LjkyNSAxLjQ2NSAyLjE1NSAxLjQ2NSAzLjUzNXMtLjUyIDIuNjEtMS40NjUgMy41MzVDNi42MyA0NS40NCA1LjM4IDQ2IDQgNDZzLTIuNjMtLjU2LTMuNTM2LTEuNDY1QS00Ljk3MyA0Ljk3MyAwIDAgMSAtMSA0MWMwLTEuMzguNTItMi42MSAxLjQ2NS0zLjUzNUMyLjM3IDM2LjU2IDIuNjIgMzYgNCAzNnoiIGZpbGwtb3BhY2l0eT0iLjI1Ii8+PHBhdGggZmlsbD0iIzAwMCIgZD0iTTIzIDBjMS4xMyAwIDIuMDQyLjExMiAyLjY0MS4zMjIuOTIyLjMyNCAxLjE4NS45MzQgMS4xODUgMi4wN2wtMS43IDE5LjU2NmMtLjE5OCAyLjM0MiAxLjc0OCAzLjQ5MiA0LjA4NSAxLjk0IDIuMTE4LTEuNCAyLjMyMy00LjExNi43NDQtNS45Mi0uMjMxLS4yNjUtLjMyOC0uMTE4LS43NzMtLjQ4OS0yLjAyOS0xLjY3OS0yLjQ2OC0zLjcyOS44NTgtNS42OTMgMS42MDYtLjk0OCAyLjk2LS43MzMgNC4xNjQuNjg4LjQwMy40NzYuNDY3LjU0OC43MDMuNDE1LjMyLS4xODQgMi4yOS0xLjUzMiAxLjU4MS0zLjc3NS0uNTc2LTEuODE2LS41NzYtMi4xNTctLjc1Ny0yLjk3LS41MDItMi4yNTQuMTY0LTIuNTU0IDEuNS0yLjU1NCAxLjY3NCAwIDIuMjgzLjY0MSAyLjI4MyAyLjE4NCAwIC43MzctLjM0OCAxLjQ5Mi0uNjk1IDIuMjQ2LS40MDIuODczLS4yOTQgMS4yOTkuNzk4IDEuMjk5LjcyMyAwIC43MDctLjI5IDEuMzItLjgyOCAxLjYxOC0xLjQxNyA0LjQyOS0uODMgNS4yIDEuMjM2LjQyLjk5LjE4IDEuODQtLjU1MSAyLjQzMi0yLjA0NSAxLjY1My0xLjIwNCAxLjcxMi0uNzA4IDIuNzYyLjQzMy45MiAxLjM1NS45OTYgMi0uNTEyLjM5Mi0uOTE5LjI4Ni0xLjI3NC0uNDMzLTEuMDc0LS43MjEuMTkxLTEuMzgyLjkyNC0xLjU2MyAyLjM1Ni0uMTE1LjkwOSAxLjMwMy44NjYgMi4yMjYuNDk0IDEuMDcyLS40MzEgMi4xNDUtLjE4NSAyLjgyIDEuMTI5LjM0Ny42NzUuMjMxIDEuNDEyLTEgMi4yMTQtLjY5NC40NS0xLjYwOCAxLjAwMi0xLjA0IDEuNzI5LjExOS4xNTEuNDMuMjg3LjUzLjQxNS4xNjcuMjEyLjI3NC0uMDcyLjk1Mi0xLjAwNi4zNi0uNDk2LjU3Mi0uMjU5LjU3Mi0uMjU5LjkxMS4yMTQgMS41ODcgMS4zMzMuODMzIDIuMjI1LS4xODguMjIyLS40MS4zMzItLjcyOC4zNDItLjM1Mi4wMTEtLjc5NC0uMTk3LTEuMzI2LS42MjItLjE2LS4xMjctLjU1Ni0uNTM5LS44NzYtLjUxMi0uNTUzLjA0Ni0uNjkyLjM5Ni0uNzMzLjU3NC0uMDczLjMxNi0uMTY2LjQxLS4yNjUuNTE3LS45OTIgMS4wNzQtMi45MTIgMy4xLTQuNTYzIDIuODYtMi41OTItLjM3NS0zLjc2NS0yLjM2LTIuMDIzLTMuODE2LjguNS45MDYuNzY1IDEuODg5LjYyNC43MzctLjEwNiAxLjYxLS40MTUgMS44ODEtMS4zODMuMTM3LS45NzgtLjU5My0xLjcxMy0xLjc1Ni0xLjU2Mi0xLjIwNy4xNjYtMi40MTUtLjE3OC0yLjQ2LTIuMTk5LS4wNDQtMi4yMSA0LjM3OC0xLjU1IDMuMjU4LTQuOTMzLS4yMzgtLjExOS0uNDgtLjA3LS43Ni4wNS0uMzI0LjE0LS41NTkuNDE2LS43MDYuNjYzLS40OTguODQtMS4wNjQgMS45MTItMi4wMjYgMi4wNzItLjQzMi4wNzItMS4wMTQtLjA3My0xLjIxNi0uODQtLjIwMS0uNzY4LS4yOC0xLjQ1NS4wMjEtMS45Ni44MjEtMS4zNzYtLjQ3Ny0yLjExOC0xLjE2LTIuNjI3LTEuMzcxLTEuMDIuMTQ3LS43OTUuMTQ3LS43OTVzMS4yNTQgMS4yNDgtLjM3NSAyLjI4Yy0uNTU3LjM1Mi0uNzUuNzMzLS42NS45MzQuMjg4LjU4MiAxLjQxNS42NDYgMi4wMTUuNDM0LjYtLjIxMiAxLjQ0NS0uMDc0IDEuMzY3IDEuODI3LS4wNDcgMS4xNDktMS4wNiAxLjkzNy0yLjY4MyAxLjk1Mi0xLjA2Ni4wMDktMS42MTItLjc0LTIuMDEyLTEuNDktLjQyLS43ODktMS43OTYtLjA5OS0xLjM3NS42OTQuODEyIDEuNTI5LTEuNDYxIDIuNTM0LTIuNzg3LjkwOC0xLjI4LTEuNTY3LS4xMjgtMi4yIDEuNzQyLTMuMzgxIDIuNzczLTEuNzUyIDMuNjUtNS4wNDIgMy42NS01LjA0MnM5Ljc2Mi0xMC44OTcgOS4zMzMtMTIuNjE1Yy0uMDk0LS4zNzYtLjMyMS0uNTYtLjY0Ni0uNTZINS40NDFDMi4wMTUgMCAuNjAxIDIuMiAwIDUuNlYyMi40YzAgMi4yLjc0MiAzLjA0IDMuMjc1IDMuNmgyLjY3TDI0LjEwOSA2MC4wMkgzNi41Yy43OTggMCAxLjExNy0uNDk2LjY5LTEuMDYybC0yLjE3Mi0yLjkwMyAxOC43MzctNi41MjRjLjkzNi0uMzc0Ljc0MS0xLjExMy0uMjI1LTEuMTM1bC02MC4wMTQtMS4zNTVjLS45OTYgMC0xLjI4Ni40NDctLjcxNCAxLjExN0w2LjcgNjBIMTguNGMuNzk4IDAgMi4xOTctLjQ5NiAzLjEtMS4wNjJsLS40ODktMi4wNTVDOC4zMTUgNDkuODgzLjI4MiA0My43MDIgMCAzM1YzMGMxLjEzIDAgMi4xMDQgMCAyLjY0MS0uMDg3Ljc1NS0uMTIxIDEuMTg1LS41MjMgMS4xODUtMS4zMDYgMC0uNzg0LS40My0xLjE1NC0xLjE4NS0xLjE1NGwtMi42NC0uMDgxVjE5YzEuMTMgMCAxLjk2OCAwIDIuNjQxLS4yNzguNjc0LS4yNzkgMS4xODUtLjcyMiAxLjE4NS0xLjcyMiAwLTEtLjQxMS0xLjQ0NC0xLjE4NS0xLjQ0NEwyIDEyLjA1NlYzLjM5MkMyIDEuMDcgMy44NyAwIDYgMGgxN3oiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] bg-center opacity-20"></div>
        </div>
        
        {/* Header with Logo & Border */}
        <div className="relative z-10 text-center">
          <div className="flex justify-center items-center mb-8">
            <div className="bg-lms-blue-600 rounded-full p-3 shadow-lg">
              <Award className="h-14 w-14 text-white" />
            </div>
          </div>
          
          <div className="border-b-2 border-lms-blue-300 mb-10">
            <h2 className="text-lms-blue-800 text-2xl font-bold uppercase tracking-wider mb-1">Certificate of Completion</h2>
            <div className="h-1 w-48 bg-lms-teal-500 mx-auto mb-4"></div>
          </div>
          
          {/* Main Content */}
          <div className="py-6 px-8 relative">
            <div className="absolute top-4 right-4">
              <div className="text-xs text-right text-gray-500">
                <span>ID: {certificate.certificateNumber}</span>
              </div>
            </div>
            
            <div className="mb-14">
              <p className="text-gray-600 text-lg mb-1">This is to certify that</p>
              <h1 className="text-4xl font-bold text-gray-800 font-serif mb-2">{certificate.userName}</h1>
              <p className="text-gray-600 text-lg mb-2">has successfully completed the course</p>
              <h3 className="text-2xl font-bold text-lms-blue-800 mb-2">{certificate.courseTitle}</h3>
              <p className="text-gray-600">
                demonstrating proficiency and understanding of all required concepts
                <br />in accordance with DSP training standards.
              </p>
            </div>
            
            <div className="flex items-center justify-center gap-4 mb-10">
              <Medal className="text-lms-teal-600 h-10 w-10" />
            </div>
            
            {/* Footer with Signatures */}
            <div className="grid grid-cols-2 gap-12 mb-6 mt-12">
              {/* Instructor Signature */}
              <div className="text-center">
                <div className="border-b border-gray-300 pb-1 mb-2">
                  <div className="flex justify-center items-end h-12">
                    <img 
                      src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMTcgNDciPjxwYXRoIGQ9Ik00Mi43IDExYy0zLjguNy03LjQgMi45LTEwLjcgNi45LTQuNCA1LjItOC42IDE0LTEwLjggMjMuMy0uMS42LS40LjMtLjMtLjIuNi0zLjQgMS44LTguMyAzLjYtMTMuNy44LTIuMyAxLjktNC44IDMuNi02LjggMy44LTQuNiA5LjgtNS4yIDE0LjctMS42IDIuNyAyIDMuOSA1LjMgMy45IDkuMiAwIDUuOS0yLjcgMTEuOC04LjMgMTMuNy0yLjkgMS00LjYuMy01LjEtMS4yLS41LTEuNC0uMi0zLjUuNy01LjMuMi0uNS41LTEgLjUtMS4yIDAtLjItLjEtLjMtLjQtLjItLjYuMS0yLjcgMi43LTQuNCBBMTYuMyAzLjYtLjMtLjUtLjcuNi00LjQgMy43LTEwLjYgMTMuOGEzOC41IDAiIGZpbGw9IiMwMDQ1ODAiLz48cGF0aCBkPSJNNTIuNSA3LjljMC0xLjEuMi0yIC45LTMuMSAzLjUtNS42IDE1LjQtNS40IDI1LjItLjIuOC41LjcuOC0uMS41LTYuOS0zLjMtMTUtNS0yMC44LTMuMS0xLjQuNS0yLjQgMS4yLTMgMy0xLjQgNC4xLTIuMSA5LjktMyAxNS45LS43IDQuNC0xLjQgOS4zLTIuOCAxNC41LS4xLjQtLjQuNC0uNC0uMS4zLTcuMSAxLjUtMTYuMiAzLTIyLjktLjYgMS4zLTEuNSAzLTIgNC41LTQgMTEuNy01LjMgMjcuNC0xLjkgMjUuNS40LS4zLjgtMS4xLjctMS45LS41LTMuMy0xLjctNi40LTIuMy04LjgtLjQtMS44LS41LTIuNy0uOS00LjMtLjItLjYtLjItMS41LjQtMS45LjYtLjUgMS40LS4zIDIgLjMuNS42LjYgMS41LjUgMi4yIDAgLjYtLjQgMS4yLS45IDEuNS0uNS41LS41LjgtLjEgMS43IDEuNSA0IDMuNiA4LjEgNC42IDEyLjMuMi43IDAgMS41LS4xIDIuMSAwIC43LjcgMS4zIDEuMy4yIDMuOS04LjEgNC44LTIwLjIgNi4xLTI4LjUuMy0xLjcuNS0zLjMuNy00LjlNMTQ3LjkgMy44YzIuMS0xLjMgNS40LTIuMSA3LjktMi4yIDMuMi0uMiA2LjguNiA4LjkgM3MzIDUuNyAyLjQgOS4xYy0uMyAyLjMtMS41IDQuNC0yLjkgNi4zLTIuNSAzLjQtNi4zIDYuNS0xMS40IDYuNy0yLjYuMS02LjEtLjMtNy4xLTIuMy0uNy0xLjMtLjctMy43LS4xLTUuMyAyLjUtNy4zIDkuNS0xMy45IDE0LjctMTYuMS43LS4zIDEuMi43LjUgMUMxNTYuMSA3LjEgMTUzIDEwIDE1MCAxNGMtMiAyLjYtMy42IDUuNS00LjMgOC43LS4xLjQtLjEgMS4yLjIgMS42IDIuNCAxLjQgNy45LS43IDEwLjQtMS45IDQtMiA3LjUtNi4yIDkuOS0xMC45IDEtMiAxLjctNC4zIDEuNy02LjUgMC0yLjgtMS02LjUtMy42LTcuNi0yLjMtMSAtNi44LS40LTktLjFNMTkwIDIuM2MyLjctLjguNS43LS42Ljl2MS4yYzAgLjggMCAxLjMtLjIgMi4yLS42IDIuOC0uOCA1LjgtMS4yIDguNi0xIDYuOC0xLjcgMTIuOS0yLjEgMTkuOSAwIC40LS40LjUgMCAwIC45LTEzLjcgMS41LTI0LjIgNC0zMi42LjEtLjIuMS0uMi4xIDAiIGZpbGw9IiMwMDQ1ODAiLz48cGF0aCBkPSJNMTcwLjkgMTQuOWMyLTIuNiA0LjMtNC43IDUuMS00LjYuNS4yLjUgMS0uNCAyLjMtLjYgMS0xLjggMyAxLjIgMi41IDEuMS0uMiAyLjMtLjggMy4xLTEuNy4zLS40LS4yLTEtLjctLjctMS40LjktMi42IDEuNC0zLjEuM3MuNC0yIDEuNC0zLjFjMS4xLTEuMSAyLjMtMS40IDMuMy0uOS45LjUgMS4xIDMgLjIgNC45LTEuMiAyLjgtNC4xIDMuMS02IDIuNC0yLjMtLjctMi43LTEuNi03LTguMy0zLTQuNy05LjgtMTAuOC0xOC43LTcuMy0yLjcgMS4xLTQuNSAzLjQtNS4yIDYuMS0uOSAzLjgtLjEgOC4xIDMuNyAxMC42IDEuNyAxLjEgMy45IDEuNiA2LjIgMS42IDMuMyAwIDYuMi0xLjUgOS0zLjIgMy42LTIuMSA3LjQtNi4zIDEwLjYtOS44IDMuNi0zLjggMTQtMTUuNSAyMC4zLTE2LjQuNC0uMSAxIC4zIDEuMS42LjIuNC0uMiAxLS42IDEuMy0xLjIuNy0yLjQgMS45LTMuNyAzLTcuNSA2LjktMTUuOCAxNy43LTIyLjkgMjYuMS0xLjEgMS4zLTIuNCAzLTQuMyAzLjktMS43LjctMy44LjMtNS42LS4xLTQtLjgtOS4yLTUuMi0xMS4yLTguOC0yLjYtNC43LTIuMS0xMC41IDAtMTMuOSAxLjUtMi4zIDQtMy45IDcuMy00LjQgMS41LS4zIDMuMS0uMiA0LjUuMSA0LjcgMS4xIDguNCA0LjUgMTEuNyA3LjkgMSAxLjEgMiAyLjQgMi44IDMuOC42IDEuMSAxLjYgMi44LjkgNC4zLS42IDEuMy0yLjMgMi4yLTMuOSAyLjEtMS44LS4xLTMuMy0xLTMuOC0yLjQtLjUtMS40LjQtMi44IDIuMS0zLjIuMy0uMS40LS4zLjMtLjUtLjEtLjMtLjQtLjMtLjYtLjMtMS40LjEtMi41IDEuMS0yLjggMi4zLS40IDEuNS43IDMgMi42IDMuNSAxLjcuNSA0LjEuMyA1LjEtMS4zIDEuNS0yLjMtMS4yLTUuNi0yLjQtNy4zYTI5LjcgMjkuNyAwIDAiIGZpbGw9IiMwMDQ1ODAiLz48cGF0aCBkPSJNMTEzLjEgMTkuOGMxLjUtLjkgNS0yLjggNy0zLjYgMy45LTEuNCA4LjMtMi4zIDEwLjEtLjUgMS4yIDEuMi44IDMuNi41IDQuOC0xLjcgNi0xMC4zIDEzLjYtMTUuNSAxOC40LS4zLjMtLjguMS0uNi0uMyA0LTYuNyA4LjctMTIuNiAxNC4zLTE4LjMuMi0uMi4zLS40LjItLjUtLjEtLjQtMS4yLS4yLTEuOS0uMS0zLjMuNy03LjMgMi43LTEwLjQgNC44LS4xLjEtLjMuMi0uNS4xLS40LS4yLS4xLS42LjMtLjhNMTA4LjkgMTkuM2wzLjYtMS45YzMuNy0xLjkgNy45LTIuOCAxMS43LTEuMiAzLjggMS43IDUgNi45IDMuMiAxMC43LTEgMi4xLTIuNSAzLjktNC40IDUuMy03LjYgNS4zLTE2LjQgMy0yMi43LTEtLjMtLjEtLjMtLjUtLjEtLjcgMi4zLjkgNC44IDEuNSA3LjIgMS42IDYgLjQgOS4xLTEuMSAxNC4yLTQuNCA0LjktMy4yIDguMi04LjkgNC45LTExLjgtMi40LTIuMS04LjgtMS41LTE0LjkgMy0uMy4yLS43LjEtLjctLjMiIGZpbGw9IiMwMDQ1ODAiLz48cGF0aCBkPSJNMjAgN2M2LjgtNi44IDIwLjYtOC40IDI4LS42LjUuNS41IDEtLjEuOEM0My4yIDQgMzIuNSAzLjQgMjYuOSA2LjNjLTIgMS4xLTMuMSAyLjYtMy43IDQuNi0xIDMuMS0xLjEgNi45LS41IDEwLjQuNC0xLjQgMS4xLTMgMS43LTQuMyA1LjItMTAuNSAyMC4xLTEzLjUgMzAuMS05LjkgNS42IDIuMSA5LjggNi40IDExLjUgMTIgLjYgMS44LjkgMy44LjYgNS43LS42IDMuNi0zLjcgNS03LjIgNS43LTMuMy42LTcuMS4zLTEwLjEtMS0yLjgtMS4yLTQuMS0zLjYtMy44LTYuMi40LTIuOSAzLjctNC45IDYuNS0zLjYgMi42IDEuMiAzLjIgNC43IDEuMiA2LjYtMiAxLjktNS40IDEuOC03LjIgMC0uOC0uOC0xLjEtMiAxLjItMi40IDIuNC0uNCA0LjguMiA1LjggMiAxIDEuNyAwIDQtMS44IDRzLTMuNi0xLjYtNC4zLTMuNGMtLjktMi40LjMtNSAyLjctNi40IDIuNC0xLjQgNS42LTEuNSA3LjkgLjIgMi4zIDEuNyAzLjEgNS42LjYgNy45LTQgMy42LTEwLjkgNC43LTE2LjcgMi44LTEwLjQtMy41LTE3LjItMTMuNC0xNy44LTI0LjEtLjEtMS4xLS41LTEuNi0xLjMuMy0xLjQgMy4zLTIuMiA3LTIuNSAxMC44LS4zIDQuNi0uNyA5LjEtMiAxMy41LS43IDIuNS0yLjMgNS45LjMgNy45czYuNC42IDkuNS0xYzQuMy0yLjEgOC4yLTUuNiAxMS42LTkgMi45LTMgNS01LjkgNy41LTkuMSAxLjEtMS4yIDItMi42IDMuMS00IDEuNC0yIDIuMy00LjEgMy40LTYuMy4yLS40LjUtLjguNi0xLjMuMS0uNC0uMi0uOC0uNi0uNi0yLjIgMS00LjIgMi43LTYuMiA0LjEtMi4zIDEuOC00LjcgMy42LTcuMSA1LjItMi42IDEuNy01LjMgMy4zLTggNC41LTMuMyAxLjQtNi44IDIuMi0xMC40IDItLjYgMC0xIDEtLjMgMS4yIDUuNSAxLjQgMTEuNi0uNyAxNi4xLTMuMSA0LTIuMiA3LjgtNSAxMS42LTcuOCAyLjEtMS42IDQtMy40IDUuNy01LjQuMy0uNC44LS4xLjYuMyAtLjggMS42LTIgMy00LjMgNC42QTc4LjYgNzguNiAwIDAiIGZpbGw9IiMwMDQ1ODAiLz48cGF0aCBkPSJNODkuNCAxMi40Yy0uNS0uNi0xLjMtLjktMi0uNy0uNy4yLTEuMS45LTEuNCAxLjYtLjYgMS4zLS45IDIuNy0xLjIgNC4xLS43IDIuNi0xLjUgNS4yLTIuOSA3LjUtLjYgMC0xLjMuMS0yLS4xLTEuMi0uMy0yLjktLjYtMy42LTEuNi0xLTEuMi0xLjEtMy0uNi00LjQuNC0xLjMgMS41LTIuMyAyLjgtMi44LjYtLjIgMS4yIDAgMS4zLjYuMS43LS42IDEuMS0xLjQgMS41LS44LjQtMS43IDEuMS0xLjMgMi4xLjMuOCAxLjIgMS4yIDIuMSAxLjIuOCAwIDEuNy0uNSAyLTEuMS40LS42LjMtMS4xLTEtMS43LTEuNS0uNi0zLTIuMS0zLjYtNC0uMy0xIC0uMi0yLjEuMy0zLjEuNC0uOS45LTEuOCAxLjctMi41LjQtLjMuOS0uNyAxLjQtLjhzMS4yLjEgMS43LjNjMSAuNSAxLjcgMS40IDIuMyAyLjMuNy45IDEuNCAxLjkgMS44IDMuMS4uMi4xLjUuMi45IDAgLjcgMSAxLjEgMSAxLjQgMCAuOS0uNS41IDAiIGZpbGw9IiMwMDQ1ODAiLz48cGF0aCBkPSJNMTk2LjYgMjNjLTIuMyAzLjgtMy4zIDgtMi40IDEyLjIuMS41LjMuOC44LjkgMy40LjIgNy44LTQgMTAuMy03LjMgMy4yLTQuMSA1LjctOC41IDUuOC0xMy44LjEtLjYuMy0xLjUtLjMtMi4xLS43LS43LTIgLjItMi42LjYtNi4yIDUtMTMuNSAxNy41LTE0LjEgMjUuNS0uNC41LS4zLTYuNSA0LjgtMTcuMi43LTEuNSAxLjUtMy4xIDIuMi00LjQuMy0uNS4xLTEuMS0uMy0xLjQtLjgtLjktMi42LjgtMi44IDEuMS01LjQgNy02LjggMTQuNC01LjQgMTYuOS40LjcgMS41IDEgMi41IDEgMS4yIDAgMi4zLS42IDMuMi0xLjIgNC44LTMuMSAxMC4xLTguNSAxMi41LTE0LjEgMS4yLTIuNyAyLTYuMS4zLTguOS0uOS0xLjUtMy4yLTIuOC01LjEtMi42LTYuOCAxLjItMTEgMTQuOS05LjQgMTUiIGZpbGw9IiMwMDQ1ODAiLz48L3N2Zz4=" 
                      alt="Instructor Signature"
                      className="h-full opacity-80"
                    />
                  </div>
                </div>
                <p className="font-medium text-gray-800">Program Instructor</p>
                <p className="text-sm text-gray-500">DSP Training Department</p>
              </div>
              
              {/* Official Signature */}
              <div className="text-center">
                <div className="border-b border-gray-300 pb-1 mb-2">
                  <div className="flex justify-center items-end h-12">
                    <FileSignature className="h-9 w-9 text-lms-blue-800 opacity-70" />
                  </div>
                </div>
                <p className="font-medium text-gray-800">{formattedIssueDate}</p>
                <p className="text-sm text-gray-500">Date Issued</p>
              </div>
            </div>
            
            {/* Additional Information */}
            <div className="mt-8 text-center text-sm text-gray-500">
              <p>This certificate verifies completion of the DSP training course: {certificate.courseTitle}</p>
              <p className="mt-1">Course completed on {formattedCompletionDate}</p>
              {validUntil && <p className="mt-1">Valid until {validUntil}</p>}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Certificate;
