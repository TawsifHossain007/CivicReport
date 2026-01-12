import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAuth/useAxiosSecure';
import IssueCard from '../../AllIssues/IssueCard';

const ResolvedIssues = () => {

    const axiosSecure = useAxiosSecure();
    const {data : Issues = []} = useQuery({
        queryKey: ['resolved-issues'],
        queryFn: async () => {
            const res = await axiosSecure.get('/issues');
            return res.data.issues;
        }
    })

    const resolvedIssues = Issues.filter(issue => issue.IssueStatus === 'Resolved')
    const latestIssues = [...resolvedIssues].sort((a,b)=> new Date(b.date) - new Date(a.date)).slice(0,8)

    return (
        <div className=''>
            <div className='text-center mt-15'>
                <h1 className="text-3xl lg:text-4xl font-bold text-green-900 text-center mb-6">Latest Resolved Issues</h1>
                <p className="text-green-800 text-center mb-12 max-w-2xl mx-auto">Stay informed with the latest updates on resolved issues. <br /> Check back regularly to see how we're improving your experience.</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-6 max-w-11/12 mx-auto mt-20'>
                {
                    latestIssues.map(issue => <IssueCard key={issue._id} issue={issue}></IssueCard>)
                }
            </div>
        </div>
    );
};

export default ResolvedIssues