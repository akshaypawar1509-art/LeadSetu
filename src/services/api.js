import { supabase } from './supabaseClient';

// Auth
export const signUpWithEmail = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
};

export const signInWithEmail = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// Leads
export const getLeads = async (filters = {}) => {
  let query = supabase.from('leads').select('*');

  if (filters.city) query = query.eq('city', filters.city);
  if (filters.category) query = query.eq('category', filters.category);
  if (filters.status) query = query.eq('status', filters.status);

  const { data, error } = await query;
  return { data, error };
};

export const createLead = async (leadData) => {
  const { data, error } = await supabase
    .from('leads')
    .insert([leadData])
    .select();
  return { data, error };
};

export const updateLead = async (leadId, updates) => {
  const { data, error } = await supabase
    .from('leads')
    .update(updates)
    .eq('id', leadId)
    .select();
  return { data, error };
};

// Call Logs
export const logCall = async (leadId, callData) => {
  const { data, error } = await supabase
    .from('call_logs')
    .insert([{ lead_id: leadId, ...callData }])
    .select();
  return { data, error };
};

export const getCallLogs = async (leadId) => {
  const { data, error } = await supabase
    .from('call_logs')
    .select('*')
    .eq('lead_id', leadId);
  return { data, error };
};

// Subscriptions
export const getUserSubscription = async (userId) => {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .single();
  return { data, error };
};

export const createSubscription = async (subscriptionData) => {
  const { data, error } = await supabase
    .from('subscriptions')
    .insert([subscriptionData])
    .select();
  return { data, error };
};
