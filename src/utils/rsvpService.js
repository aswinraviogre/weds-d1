import { supabase } from './supabase';

/**
 * Submits RSVP form data directly to the Supabase 'rsvp' table.
 *
 * @param {Object} formData
 * @param {string} formData.fullName
 * @param {string} formData.email
 * @param {string} [formData.phoneNumber]
 * @param {number|string} [formData.totalAttendees=1]
 * @param {string} [formData.additionalGuests]
 * @param {boolean} [formData.attendingMehendi=false]
 * @param {boolean} [formData.attendingSangeeth=false]
 * @param {boolean} [formData.attendingHaldi=false]
 * @param {boolean} [formData.attendingPelliKoduku=false]
 * @param {boolean} [formData.attendingWedding=false]
 * @param {string} [formData.dietaryRequirements]
 * @param {string} [formData.message]
 * @returns {Promise<{ success: boolean, data?: any, error?: string }>}
 */
export async function submitRsvp(formData) {
  try {
    if (!formData.fullName || !formData.fullName.trim()) {
      throw new Error('Full name is required.');
    }

    // Format fields matching the Supabase table schema
    const record = {
      full_name: formData.fullName.trim(),
      email: formData.email ? formData.email.trim() : null,
      phone_number: formData.phoneNumber ? formData.phoneNumber.trim() : null,
      total_attendees: Number(formData.totalAttendees) || 1,
      additional_guests: formData.additionalGuests ? formData.additionalGuests.trim() : null,
      attending_mehendi: Boolean(formData.attendingMehendi),
      attending_sangeeth: Boolean(formData.attendingSangeeth),
      attending_haldi: Boolean(formData.attendingHaldi),
      attending_pelli_koduku: Boolean(formData.attendingPelliKoduku),
      attending_wedding: Boolean(formData.attendingWedding),
      dietary_requirements: formData.dietaryRequirements ? formData.dietaryRequirements.trim() : null,
      message: formData.message ? formData.message.trim() : null,
    };

    const { data, error } = await supabase
      .from('rsvp')
      .insert([record])
      .select();

    if (error) {
      console.error('Supabase RSVP insert error:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data: data?.[0] };
  } catch (err) {
    console.error('RSVP submission error:', err);
    return {
      success: false,
      error: err.message || 'An unexpected error occurred while saving your RSVP.',
    };
  }
}
