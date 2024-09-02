import { getChallengeById } from '@/actions/challenge.actions'
import ChallengeForm from '@/components/forms/CreateChallengeForm'
import React from 'react'

const UpdatePage = async({ params: { challengeId}}: SearchParamProps) => {
    const challenge = await getChallengeById(challengeId)
    if(!challenge) return "Not found"
  return (
    <div>
        <ChallengeForm type='update' challenge={challenge} />
    </div>
  )
}

export default UpdatePage
