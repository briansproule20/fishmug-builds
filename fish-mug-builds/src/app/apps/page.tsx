import { FolderOpen } from 'lucide-react';

export default function AppsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-12 text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-lg bg-orange-100 p-6">
            <FolderOpen className="size-16 text-orange-600" />
          </div>
        </div>
        <h1 className="mb-4 font-bold text-4xl tracking-tight">
          App Directory
        </h1>
        <p className="mx-auto max-w-2xl text-gray-600 text-lg">
          Coming soon - browse and explore all available applications
        </p>
      </div>
    </div>
  );
}
