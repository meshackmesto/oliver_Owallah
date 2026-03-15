// If JS runs, hide the warning banner (means we are NOT in a restricted viewer)
document.addEventListener('DOMContentLoaded', function() {
  var banner = document.getElementById('wa-banner');
  if (banner) banner.style.display = 'none';
});

// Fallback in case DOMContentLoaded already fired
(function() {
  var banner = document.getElementById('wa-banner');
  if (banner) banner.style.display = 'none';
})();

var DB = {
  "BILHA RISPER AKINYI":      {size:"M+1",dep:1,deps:[{n:"Ella Salima Kinda",t:"ch"}]},
  "Benson Angienda Kowala":   {size:"M+1",dep:1,deps:[{n:"Jacinta Atieno Ojuango",t:"sp"}]},
  "Billian Rachael":          {size:"M+4",dep:4,deps:[{n:"Davis Osewe",t:"sp"},{n:"Jayden Brandon",t:"ch"},{n:"Aocklyne Penny",t:"ch"},{n:"Finley Williams",t:"ch"}]},
  "David Odhiambo Owalla":    {size:"M+3",dep:3,deps:[{n:"Grace Akinyi",t:"sp"},{n:"Bilha Aimie Odhiambo",t:"ch"},{n:"Jenna Abby Roslyder Odhiambo",t:"ch"}]},
  "EMANUELLE ADHIAMBO ODHIAMBO":{size:"M",dep:0,deps:[]},
  "Elizabeth Adhiambo Owalla":{size:"M",dep:0,deps:[]},
  "Erick Omondi":             {size:"M+5",dep:5,deps:[{n:"Sarah Keminto Osiemo",t:"sp"},{n:"Yvonne Akinyi Omondi",t:"ch"},{n:"Vallentine Adelle Weche",t:"ch"},{n:"Ryan Ochieng Omondi",t:"ch"},{n:"Adrian Kowala Omondi",t:"ch"}]},
  "Evan Obed Munga":          {size:"M",dep:0,deps:[]},
  "Hellen Nyakind Owala":     {size:"M+1",dep:1,deps:[{n:"Francis Odhiambo Ogola",t:"sp"}]},
  "Job Ouma":                 {size:"M+4",dep:4,deps:[{n:"Patience Musera",t:"sp"},{n:"Angel Anne-Marie",t:"ch"},{n:"Seth Job-Nettoh Jnr",t:"ch"},{n:"Zachary Nathaniel-Charles",t:"ch"}]},
  "KENNAS OKEYOH OWALLAH":    {size:"M+5",dep:5,deps:[{n:"Mourine Adhiambo Florence",t:"sp"},{n:"Michael Kwatch",t:"ch"},{n:"Martin Luther King KOwala",t:"ch"},{n:"Prince Hector KOwala",t:"ch"},{n:"Esther-Bilha Best KOwala",t:"ch"}]},
  "Kawaka Bill Jezreel":      {size:"M",dep:0,deps:[]},
  "Kennedy Odongo":           {size:"M",dep:0,deps:[]},
  "Lameck Odiwuor Kowala":    {size:"M+1",dep:1,deps:[{n:"Martin Otieno Odiwuor",t:"ch"}]},
  "Mary Adoyo Owallah":       {size:"M+1",dep:1,deps:[{n:"Edward Ojwang Nyagol",t:"sp"}]},
  "Mercy Akinyi Angienda":    {size:"M",dep:0,deps:[]},
  "Oliver Arthur Owalla":     {size:"M+3",dep:3,deps:[{n:"Sharon Terer Chepkirui",t:"sp"},{n:"Noah Kibet Owalla",t:"ch"},{n:"Jasmine Cheptoo Adhiambo Owalla",t:"ch"}]},
  "PEREZ ANYANGO OWALLAH":    {size:"M",dep:0,deps:[]},
  "PHILIP OLUOCH ODIWUOR":    {size:"M",dep:0,deps:[]},
  "RUTH ACHIENG OWALLA":      {size:"M+3",dep:3,deps:[{n:"Boaz Omori Munga",t:"sp"},{n:"Susan Lisa Omori",t:"ch"},{n:"Boaz Mich Omori",t:"ch"}]},
  "Rachel Adhiambo Odiwuor":  {size:"M",dep:0,deps:[]},
  "Salmon Ouma Okongo":       {size:"M",dep:0,deps:[]},
  "Sharon Apiyo Ben":         {size:"M+5",dep:5,deps:[{n:"Calvince Ochieng Aduda",t:"sp"},{n:"Maryanne Tiana",t:"ch"},{n:"Zyair Aduda",t:"ch"},{n:"Calvince Junior Ochieng",t:"ch"},{n:"Joshua Adero",t:"ch"}]},
  "VIVIANNE ADHIAMBO OUMA":   {size:"M+1",dep:1,deps:[{n:"Bonnie Harriet",t:"ch"}]},
  "Victor":                   {size:"M",dep:0,deps:[]}
};

var sm = null;    // selected member object
var sip = null;   // selected inpatient limit (number)
var sop = null;   // selected outpatient limit (number)

function fmt(n){ return 'KES ' + Math.round(n).toLocaleString(); }
function fL(l){ return l >= 1000000 ? 'KES ' + (l/1000000).toFixed(0) + 'M' : 'KES ' + (l/1000) + 'K'; }

function onMember(val) {
  sm = DB[val] || null;
  sip = null;
  sop = null;

  // Update family info box
  var fi = document.getElementById('fi');
  if (sm) {
    document.getElementById('fs').textContent = sm.size;
    document.getElementById('fc').textContent = (sm.dep + 1) + ' ' + (sm.dep + 1 === 1 ? 'person' : 'people');
    var da = document.getElementById('da');
    if (sm.deps.length > 0) {
      var h = '<div class="dtags">';
      for (var i = 0; i < sm.deps.length; i++) {
        h += '<span class="dtag ' + (sm.deps[i].t === 'sp' ? 'sp' : 'ch') + '">' + sm.deps[i].n + '</span>';
      }
      h += '</div>';
      da.innerHTML = h;
    } else {
      da.innerHTML = '<div class="nodep">Individual cover &mdash; no dependants</div>';
    }
    fi.className = 'finfo on';
  } else {
    fi.className = 'finfo';
  }

  // Show/hide outpatient pills based on dep count
  // All inpatient pills are always available (AAR supports all family sizes for IP)
  var dep = sm ? sm.dep : 0;
  var opPills = document.querySelectorAll('#opp .pill');
  for (var i = 0; i < opPills.length; i++) {
    var maxDep = parseInt(opPills[i].getAttribute('data-max'));
    if (dep > maxDep) {
      opPills[i].className = 'pill hide';
    } else {
      opPills[i].className = 'pill';
    }
  }

  // Reset selected labels
  document.getElementById('ipl').textContent = 'Tap a limit to select';
  document.getElementById('opl').textContent = 'Tap a limit to select';
  document.getElementById('ipp').className = 'cpanel';
  document.getElementById('opp').className = 'cpanel';

  // Deselect all pills
  var allPills = document.querySelectorAll('.pill');
  for (var i = 0; i < allPills.length; i++) {
    if (allPills[i].className.indexOf('hide') === -1) {
      allPills[i].className = 'pill';
    }
  }

  render();
}

function selectPill(type, lim, el) {
  if (!sm) return;

  var dep    = Math.min(sm.dep, 6);
  var panelId = type === 'ip' ? 'ipp' : 'opp';
  var lblId   = type === 'ip' ? 'ipl' : 'opl';
  var activeClass = type === 'ip' ? 'aip' : 'aop';

  // Toggle selection
  if (type === 'ip') { sip = (sip === lim) ? null : lim; }
  else               { sop = (sop === lim) ? null : lim; }

  var selVal = type === 'ip' ? sip : sop;

  // Reset all pills in this panel
  var panelPills = document.getElementById(panelId).getElementsByTagName('button');
  for (var i = 0; i < panelPills.length; i++) {
    panelPills[i].className = (panelPills[i].className.indexOf('hide') !== -1) ? 'pill hide' : 'pill';
  }
  // Highlight selected pill using the directly passed element reference
  if (selVal !== null && el) {
    el.className = 'pill ' + activeClass;
  }

  // Update label
  var lbl   = document.getElementById(lblId);
  if (selVal !== null) {
    lbl.innerHTML = 'Selected: <b>' + fL(selVal) + '</b>';
  } else {
    lbl.textContent = 'Tap a limit to select';
  }

  render();
}

function getAmt(type, lim) {
  if (!sm || lim === null) return 0;
  var dep = Math.min(sm.dep, 6);
  var suffix = lim >= 1000000 ? (lim/1000000).toFixed(0) + 'M' : (lim/1000) + 'K';
  var el = document.getElementById(type + '-' + suffix);
  if (!el) return 0;
  return parseInt(el.getAttribute('data-amt-' + dep)) || 0;
}

function render() {
  var area = document.getElementById('ra');
  if (!sm) {
    area.innerHTML = '<div class="empty"><div class="ei">&#128737;</div>Select your name and at least one cover limit to see your premium.</div>';
    return;
  }
  if (!sip && !sop) {
    area.innerHTML = '<div class="empty"><div class="ei">&#9757;</div>Please select an inpatient limit. You must have inpatient cover &mdash; outpatient can be added on top.</div>';
    return;
  }
  if (!sip && sop) {
    area.innerHTML = '<div class="empty"><div class="ei">&#9888;</div><strong>Inpatient cover is required.</strong><br>You cannot select outpatient only. Please also choose an inpatient limit above.</div>';
    return;
  }

  var ip = getAmt('ip', sip);
  var op = getAmt('op', sop);
  var tot = ip + op;
  var mo  = Math.round(tot / 12);
  var pp  = Math.round(tot / (sm.dep + 1));
  var pl  = (sm.dep + 1) === 1 ? '1 person' : (sm.dep + 1) + ' people';

  var ir = ip
    ? '<div class="rrow"><span class="rl">Inpatient &mdash; ' + fL(sip) + '</span><span class="rv ip">' + fmt(ip) + '</span></div>'
    : '<div class="rrow"><span class="rl">Inpatient</span><span class="rv dim">Not selected</span></div>';
  var or2 = op
    ? '<div class="rrow"><span class="rl">Outpatient &mdash; ' + fL(sop) + '</span><span class="rv op">' + fmt(op) + '</span></div>'
    : '<div class="rrow"><span class="rl">Outpatient</span><span class="rv dim">Not selected</span></div>';

  area.innerHTML =
    '<div class="rcard">' + ir + or2 +
    '<div class="tband">' +
      '<div><div class="ttitle">Total annual premium</div><div class="tname">' + sm.size + ' &middot; ' + pl + '</div></div>' +
      '<div class="tamount">' + fmt(tot) + '</div>' +
    '</div></div>' +
    '<div class="mgrid">' +
      '<div class="mc"><div class="ml">Monthly equiv.</div><div class="mv">' + fmt(mo) + '</div></div>' +
      '<div class="mc"><div class="ml">Per person / yr</div><div class="mv">' + fmt(pp) + '</div></div>' +
      '<div class="mc"><div class="ml">People covered</div><div class="mv">' + pl + '</div></div>' +
    '</div>';
}
