import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://ehwyqlqyuwqgczpacsch.supabase.co";
const serviceRoleKey = "sb_publishable_GXbfYhTI9A2QrG61G98Wjw_LaPIpoWV";
const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false
  }
});

function verifyAdminPin(request) {
  {
    return true;
  }
}
function unauthorizedResponse() {
  return new Response(
    JSON.stringify({ ok: false, message: "PIN de administrador incorrecto" }),
    {
      status: 401,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}
function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export { jsonResponse as j, supabase as s, unauthorizedResponse as u, verifyAdminPin as v };
