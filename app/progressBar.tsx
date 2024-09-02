import { Progress } from '@/components/ui/progress'
import React from 'react'

const ProgressBar = ({ numberOfResponses }: {numberOfResponses: number}) => {
  return (
    <div>
        <div className="flex items-center space-x-4">
            <Progress value={(numberOfResponses / 30) * 100} className="w-full" />
            <span className="text-sm font-medium">{numberOfResponses}/30 Days</span>
          </div>
    </div>
  )
}

export default ProgressBar
