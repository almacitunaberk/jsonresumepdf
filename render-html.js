const { render: renderKendall } = require("./kendall/kendall_render.js")
const { render: renderAutumn } = require("./autumn/autumn_render.js")
const { render: renderStraightForward } = require("./straightforward/straightforward_render.js")
const { render: renderStackoverflow } = require("./stackoverflow/stackoverflow_render.js")
const { render: renderFlat } = require("./flat/flat_render.js")
const { render: renderSrt } = require("./srt/srt_render.js")
const { render: renderContempo } = require("./contempo/contempo_render.js")
const { render: renderFresh } = require("./fresh/fresh_render.js")
const { render: renderDirect } = require("./direct/direct_render.js")
const { render: renderCompactExtended } = require("./compact-extended/compact-extended_render.js")
const { render: renderSlickoverflow } = require("./slickoverflow/slickoverflow_render.js")
const { render: renderElSanto } = require("./el-santo/el-santo_render.js")
const { render: renderShort } = require("./short/short_render.js")
const { render: renderCora } = require("./cora/cora_render.js")
const { render: renderClassy } = require("./classy/classy_render.js")
const { render: renderDinesh } = require("./dinesh/dinesh_render.js")
const { render: renderRnord } = require("./rnord/rnord_render.js")
const { render: renderConciseSerif } = require("./concise-serif/concise-serif_render.js")
const { render: renderHydejack } = require("./hydejack/hydejack_render.js")
const { render: renderMocha } = require("./mocha/mocha_render.js")

const renderHTML = ({ resume, theme }) => {
  if (theme === "kendall")  {
    return renderKendall(resume);
  }
  if (theme === "autumn") {
   return renderAutumn(resume);
  }
  if (theme === "straightforward") {
   return renderStraightForward(resume);
  }
  if (theme === "stackoverflow") {
    return renderStackoverflow(resume);
  }
  if (theme === "flat") {
    return renderFlat(resume);
  }
  if (theme === "srt") {
    return renderSrt(resume);
  }
  if (theme === "contempo") {
    return renderContempo(resume);
  }
  if (theme === "fresh") {
    return renderFresh(resume);
  }
  if (theme === "direct") {
    return renderDirect(resume);
  }
  if (theme === "compact-extended") {
    return renderCompactExtended(resume);
  }
  if (theme === "slickoverflow") {
    return renderSlickoverflow(resume);
  }
  if (theme === "el-santo") {
    return renderElSanto(resume);
  }
  if (theme === "short") {
    return renderShort(resume);
  }
  if (theme === "cora") {
    return renderCora(resume);
  }
  if (theme === "classy") {
    return renderClassy(resume);
  }
  if (theme === "dinesh") {
    return renderDinesh(resume);
  }
  if (theme === "rnord") {
    return renderRnord(resume);
  }
  if (theme === "concise-serif") {
    return renderConciseSerif(resume);
  }
  if (theme === "hydejack") {
    return renderHydejack(resume);
  }
  if (theme === "mocha") {
    return renderMocha(resume);
  }
}


  module.exports = renderHTML