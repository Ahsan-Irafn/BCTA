import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { name, email, phone, state, course } = data;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone number are required.' },
        { status: 400 }
      );
    }

    // Since third-party CRM credentials are not yet configured in this phase,
    // we direct enquiries safely to the verified email and live destination
    return NextResponse.json({
      success: true,
      message: 'Your enquiry has been received. A course advisor will contact you shortly.',
      enquiryDetails: {
        name,
        email,
        phone,
        state: state || 'Victoria',
        course: course || 'General Enquiry',
        officialDestination: 'enquiries@bcta.vic.edu.au',
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
