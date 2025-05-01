
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
    <Card className="h-full transition-all duration-300 hover:shadow-xl border-t-4 hover:scale-[1.02] group">
      <div className="h-full flex flex-col" style={{ borderTopColor: color }}>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div 
              className="p-3 rounded-full transition-all duration-300 group-hover:rotate-6" 
              style={{ 
                backgroundColor: `${color}25`, 
                color: color,
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)' 
              }}
            >
              <Icon className="h-7 w-7" />
            </div>
            <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          </div>
          <CardDescription className="pt-2 text-gray-600">{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-gray-500 italic">Calculate your {title.toLowerCase()} effortlessly with our precise tool.</p>
        </CardContent>
        <CardFooter>
          <Button 
            asChild 
            className="w-full transition-all duration-300 hover:brightness-110" 
            style={{ 
              backgroundColor: color,
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)'
            }}
          >
            <Link to={path}>Calculate Now</Link>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default CalculatorCard;
