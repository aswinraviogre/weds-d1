// Automated Test Suite for Wedding RSVP API and Admin Portal
const baseUrl = 'http://localhost:5000';
const adminPasscode = 'yashmrudula2026';

async function runTests() {
  console.log('🧪 Starting Automated API Verification Suite...\n');
  let passed = 0;
  let total = 0;

  const assert = (condition, title) => {
    total++;
    if (condition) {
      console.log(`✅ [PASS] ${title}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${title}`);
    }
  };

  try {
    // 1. Health Check
    const health = await fetch(`${baseUrl}/api/health`).then((r) => r.json());
    assert(health.status === 'ok', 'Health Check API returns status ok');

    // 2. RSVP Attending Submission (Ramesh & Priya)
    const attendingPayload = {
      guest_name: 'Dr. Ramesh Sharma',
      guest_email: 'ramesh.sharma@example.com',
      phone_number: '+1 (214) 555-0199',
      attendance_status: 'attending',
      attendees_count: 2,
      additional_guests: 'Priya Sharma',
      selected_events: ['mehendi', 'sangeeth', 'wedding_ceremony'],
      dietary_requirements: 'Strict Vegetarian / No Garlic',
      special_requests: 'Heartiest congratulations to Yaswanth and Lakshmi!',
    };

    const res1 = await fetch(`${baseUrl}/api/rsvp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(attendingPayload),
    });
    const data1 = await res1.json();
    assert(res1.status === 201 && data1.success === true, 'Accepting RSVP with multiple events saves successfully');

    // 3. RSVP Declining Submission (Ananya)
    const decliningPayload = {
      guest_name: 'Ananya Reddy',
      guest_email: 'ananya.reddy@example.com',
      phone_number: '+1 (512) 555-0244',
      attendance_status: 'declined',
      attendees_count: 0,
      selected_events: [],
      special_requests: 'Sending so much love from London! Wish I could be there.',
    };

    const res2 = await fetch(`${baseUrl}/api/rsvp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(decliningPayload),
    });
    const data2 = await res2.json();
    assert(res2.status === 201 && data2.success === true, 'Declining RSVP saves successfully');

    // 4. RSVP Validation Rejection (Empty name)
    const invalidPayload = {
      guest_name: '',
      guest_email: 'bademail',
      attendance_status: 'attending',
    };
    const res3 = await fetch(`${baseUrl}/api/rsvp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(invalidPayload),
    });
    assert(res3.status === 400, 'Invalid RSVP rejected with 400 Bad Request');

    // 5. Admin Passcode Verification
    const authWrong = await fetch(`${baseUrl}/api/admin/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ passcode: 'wrongcode' }),
    });
    assert(authWrong.status === 401, 'Unauthorized passcode rejected with 401');

    const authCorrect = await fetch(`${baseUrl}/api/admin/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ passcode: adminPasscode }),
    });
    assert(authCorrect.status === 200, 'Correct admin passcode authenticated');

    // 6. Admin Stats
    const statsRes = await fetch(`${baseUrl}/api/admin/stats`, {
      headers: { 'x-admin-passcode': adminPasscode },
    });
    const statsData = await statsRes.json();
    assert(statsData.success === true, 'Admin stats retrieved successfully');
    assert(statsData.data.totalSubmissions >= 2, 'Total submissions counted accurately');
    assert(statsData.data.totalExpectedAttendees >= 2, 'Total expected attendees counted correctly');
    assert(statsData.data.eventCounts.wedding_ceremony >= 2, 'Per-event attendance breakdown calculated correctly');

    // 7. Admin CSV Export
    const exportRes = await fetch(`${baseUrl}/api/admin/export?passcode=${adminPasscode}`);
    const csvText = await exportRes.text();
    assert(exportRes.status === 200 && csvText.includes('Guest Name'), 'CSV export endpoint returns proper CSV document');

    console.log(`\n🎉 Results: ${passed}/${total} tests passed successfully!`);
  } catch (err) {
    console.error('Test execution failed:', err);
  }
}

runTests();
