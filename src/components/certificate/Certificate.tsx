
import React from 'react';
import { format } from 'date-fns';
import { Certificate as CertificateType } from '@/data/courseTypes';
import { Card } from '@/components/ui/card';
import { Award, Medal, CheckCheck } from 'lucide-react';

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
              <div className="text-center border-t border-gray-300 pt-2">
                <div className="flex justify-center mb-3">
                  <CheckCheck className="h-8 w-8 text-lms-blue-600" />
                </div>
                <p className="font-medium text-gray-800">Course Instructor</p>
                <p className="text-sm text-gray-500">Training Department</p>
              </div>
              
              <div className="text-center border-t border-gray-300 pt-2">
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
