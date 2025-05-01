
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
    <Card className="h-full border shadow-sm hover:shadow-md transition-all duration-300">
      <div 
        className="h-full flex flex-col" 
        style={{ borderTop: `4px solid ${color}` }}
      >
        <CardHeader>
          <div className="flex items-center gap-3">
            <div 
              style={{ 
                backgroundColor: `${color}25`, 
                color: color,
                padding: '0.75rem',
                borderRadius: '9999px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              <Icon className="h-6 w-6" />
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
            style={{ 
              width: '100%',
              backgroundColor: color,
              color: 'white',
              transition: 'all 0.3s ease'
            }}
            className="hover:opacity-90"
          >
            <Link to={path}>Calculate Now</Link>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default CalculatorCard;
