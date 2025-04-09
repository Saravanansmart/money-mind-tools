
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ResultCardProps {
  title: string;
  value: string | number;
  description?: string;
  className?: string;
}

const ResultCard: React.FC<ResultCardProps> = ({ title, value, description, className }) => {
  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardHeader className="bg-gray-50 pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-2xl font-bold">{value}</p>
        {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
      </CardContent>
    </Card>
  );
};

export default ResultCard;
