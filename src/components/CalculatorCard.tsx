
import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CalculatorCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  color: string;
}

const CalculatorCard = ({ title, description, icon: Icon, path, color }: CalculatorCardProps) => {
  return (
    <Card className="h-full transition-all duration-300 hover:shadow-lg border-t-4" style={{ borderTopColor: color }}>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full" style={{ backgroundColor: `${color}25` }}>
            <Icon className="h-6 w-6" style={{ color: color }} />
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
        <CardDescription className="pt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-500">Calculate your {title.toLowerCase()} effortlessly with our easy-to-use calculator.</p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" style={{ backgroundColor: color }}>
          <Link to={path}>Calculate Now</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CalculatorCard;
