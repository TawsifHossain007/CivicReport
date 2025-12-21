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
    const latestIssues = [...resolvedIssues].sort((a,b)=> new Date(b.date) - new Date(a.date)).slice(0,6)

    return (
        <div className='bg-white py-10'>
            <div className='text-center mt-15'>
                <h1 className='font-bold text-5xl text-green-900'>Latest Resolved Issues</h1>
                <p className='font-normal text-green-800 pt-5'>Stay informed with the latest updates on resolved issues. <br /> Check back regularly to see how we're improving your experience.</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-11/12 mx-auto mt-20'>
                {
                    latestIssues.map(issue => <IssueCard key={issue._id} issue={issue}></IssueCard>)
                }
            </div>
        </div>
    );
};

export default ResolvedIssues