const approveTemplate = (data) => {
  return `
  <div style="font-family: Arial; background:#f4f6f9; padding:20px;">
    <div style="max-width:600px;margin:auto;background:#ffffff;padding:20px;border-radius:10px;">
      <h2 style="color:#2c3e50;">New IT Request</h2>
      <p><strong>Request No:</strong> ${data.docNO}</p>
      <p><strong>User:</strong> ${data.name}</p>
      <p><strong>Item:</strong> ${data.item}</p>

      <div style="margin-top:30px;text-align:center;">
        <a href="${data.approveLink}"
           style="background:#27ae60;color:white;padding:12px 20px;
           text-decoration:none;border-radius:6px;margin-right:10px;">
           ✅ Approve
        </a>

        <a href="${data.rejectLink}"
           style="background:#e74c3c;color:white;padding:12px 20px;
           text-decoration:none;border-radius:6px;">
           ❌ Reject
        </a>
      </div>

      <p style="margin-top:40px;font-size:12px;color:#999;">
        IT Borrow System
      </p>
    </div>
  </div>
  `;
};

module.exports = { approveTemplate };