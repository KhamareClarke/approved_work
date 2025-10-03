import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { jobId, action, adminNotes } = await request.json();
    
    if (!jobId || !action) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: jobId and action',
        message: 'Invalid request'
      }, { status: 400 });
    }

    if (!['approve', 'reject'].includes(action)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid action. Must be "approve" or "reject"',
        message: 'Invalid action'
      }, { status: 400 });
    }

    // Update job status
    const updateData = {
      is_approved: action === 'approve',
      status: action === 'approve' ? 'approved' : 'rejected',
      application_status: action === 'approve' ? 'open' : null, // Make job available for applications when approved
      admin_notes: adminNotes || null,
      approved_at: action === 'approve' ? new Date().toISOString() : null,
      updated_at: new Date().toISOString()
    };

    const { data: job, error: updateError } = await supabase
      .from('jobs')
      .update(updateData)
      .eq('id', jobId)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating job:', updateError);
      return NextResponse.json({
        success: false,
        error: 'Failed to update job status',
        message: 'Database error'
      }, { status: 500 });
    }

    if (!job) {
      return NextResponse.json({
        success: false,
        error: 'Job not found',
        message: 'Job not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: {
        jobId: job.id,
        status: job.status,
        isApproved: job.is_approved,
        message: `Job ${action}d successfully`
      },
      message: `Job ${action}d successfully`
    });

  } catch (error) {
    console.error('Job approval error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to process job approval'
    }, { status: 500 });
  }
}

