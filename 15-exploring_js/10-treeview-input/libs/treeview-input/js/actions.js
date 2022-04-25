function collapseNode(label) { //alert("collapse"); 
  var node = label.parent();
  $(node).children(".node-button").empty();
  $(node).children(".node-button").prepend("&#x25BA;");
  var rootChild = label.siblings(".node, .leaf");
  rootChild.slideUp("fast", function () { node.removeClass("child-expanded"); });
}
function expandNode(label) { //alert("expand");
  var node = label.parent();
  $(node).children(".node-button").empty();
  $(node).children(".node-button").prepend("&#x25BC;");
  label.siblings(".node, .leaf").slideDown("fast");
  node.addClass("child-expanded");
}
function expandAndCollapse() {
  var label = $(this);
  const node = $(this).parent();
  if (node.hasClass("child-expanded")) {
    collapseNode(label);
  } else {
    expandNode(label);
  }
}
function triggerSiblingsLabels() {
  $(this).siblings(".node-label").trigger("click");
}
function selectAllNodes() {
  const node = $(this).parent();
  const rootChild = $(".root");
  rootChild.find("input.node-checkbox").prop("checked", $this.prop("checked"));
  node.trigger("checkboxesUpdate");
}
function uncheckAllSubNodes(currentCheckbox, currentNode, rootCheckbox) {
    // If unchecked uncheck all the ancestors
    currentNode.parents(".node, .leaf").children("input.node-checkbox").prop("checked", currentCheckbox.prop("checked"));
    // also uncheck the root
    rootCheckbox.prop("checked", false);
}
function checkAllSubNodes(currentNode, rootCheckbox) {
  const $parentNode = currentNode.parent(".node, .leaf");
  const $parentNodeCheckbox = $parentNode.children("input.node-checkbox");
  // If checked check for the siblings state and check the parent if all siblings are checked too
  const allCheckboxesInCurrentDepth = $parentNode.find(".node .node-checkbox, .leaf .node-checkbox").length;
  const allCheckedCheckboxesInCurrentDepth = $parentNode.find(".node .node-checkbox:checked, .leaf .node-checkbox:checked").length;
  // all nodes in and below siblings are checked
  if (allCheckboxesInCurrentDepth === allCheckedCheckboxesInCurrentDepth) {
    // check the parent
    if ($parentNodeCheckbox.length) {
      $parentNodeCheckbox.prop("checked", true);
    } else {
      rootCheckbox.prop("checked", true);
    }
  }
}
function selectAllSubNodes() {
  const currentCheckbox = $(this);
  const currentNode = currentCheckbox.parent();  
  const rootChild = currentCheckbox.parents(".root"); // The node that contains all the elements of hierarchy;
  const rel = rootChild.attr("rel"); // Identifier (rel attribute of current hierarchy root)
  const $root = $(".root[rel=" + rel + "]");
  const rootCheckbox = $(".root[rel=" + rel + "] .root-checkbox");
  // take care of children | Easy one
  currentCheckbox.siblings(".node, .leaf").find("input.node-checkbox").prop("checked", currentCheckbox.prop("checked"));
  //take care of parents | tough one
  if (!currentCheckbox.prop("checked")) {
    uncheckAllSubNodes(currentCheckbox, currentNode, rootCheckbox);
  } else {
    checkAllSubNodes(currentNode, rootCheckbox);
  }
  $root.trigger("checkboxesUpdate", [rootChild.find(".node-checkbox:checked")]);
}

export { expandAndCollapse,
         triggerSiblingsLabels,
         selectAllNodes,
         selectAllSubNodes };