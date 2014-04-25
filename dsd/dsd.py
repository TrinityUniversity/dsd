"""TO-DO: Write a description of what this XBlock is."""

import json
import pkg_resources
from jinja2 import Template

from xblock.core import XBlock
from xblock.fields import Scope, Integer, String, Dict
from xblock.fragment import Fragment

DISPLAY_HELP = "This name appears in the horizontal navigation at the top of the page."
DISPLAY_DEFAULT = "Datastructure Diagram"
QUESTION_HELP = "The question that will be shown to the user."
QUESTION_DEFAULT = "Draw a singularly linked list with the values [1,2,3,4]."

class DsdXBlock(XBlock):
    """
        TO-DO: document what your XBlock does.
    """
    display_name = String(
        display_name="Display Name",
        help=DISPLAY_HELP,
        scope=Scope.settings,
        default=DISPLAY_DEFAULT,
    )

    question = String(
        display_name="Question",
        help=QUESTION_HELP,
        scope=Scope.content,
        default=QUESTION_DEFAULT,
    )

    teacher_solution = Dict(
        display_name=None,
        help=None,
        scope=Scope.content,
        default=None)

    stage = Dict(
        display_name=None,
        help=None,
        scope=Scope.user_state,
        default=None)

    def studio_view(self, context=None):
        if context == None:
            # Can't access properties of fields (i.e. self.question.help) so must
            # resort to building our out dictionary
            context = {
                "question" : { 
                    "help" : QUESTION_HELP,
                    "default": QUESTION_DEFAULT
                }
            }

        # frag = Fragment(html.format(self=self))
        html = Template(self.resource_string("templates/html/dsd_edit.html"))
        frag = Fragment(html.render(context))
        frag.add_css(self.resource_string("public/css/dsd.css"))
        frag.add_javascript(self.resource_string("public/libs/kinetic/5.0.1/kinetic.min.js"))
        frag.add_javascript(self.resource_string("public/js/dsd_common.js"))
        frag.add_javascript(self.resource_string("public/js/dsd_edit.js"))
        frag.initialize_js('DsdXBlock')
        print self.runtime.local_resource_url(self, 'public/img/SingleNode.jpg')
        return frag

    def student_view(self, context=None):
        html = self.resource_string("templates/html/dsd.html")
        frag = Fragment(html.format(self=self))
        frag.add_css(self.resource_string("public/css/dsd.css"))
        frag.add_javascript(self.resource_string("public/libs/kinetic/5.0.1/kinetic.min.js"))
        frag.add_javascript(self.resource_string("public/js/dsd_common.js"))
        frag.add_javascript(self.resource_string("public/js/dsd.js"))
        frag.initialize_js('DsdXBlock')
        return frag

    def resource_string(self, path):
        """
            Handy helper for getting resources from our kit.
        """
        data = pkg_resources.resource_string(__name__, path)
        return data.decode("utf8")

    @XBlock.json_handler
    def save_teacher(self, data, suffix=''):
        self.teacher_solution = data
        # self.stage = data.get("stage")

    @XBlock.json_handler
    def get_stage(self, data, suffix=''):
        if self.stage == None:
            return ""
        else:
            return self.stage

    @XBlock.json_handler
    def save_stage(self, data, suffix):
        self.stage = data;
        
    @staticmethod
    def workbench_scenarios():
        """
            A canned scenario for display in the workbench.
        """
        return [("DsdXBlock", "<dsd/>"),]

    # Fields are defined on the class.  You can access them in your code as
    # self.<fieldname>.

    # TO-DO: delete count, and define your own fields.
    # count = Integer(
    #     default=0, scope=Scope.user_state,
    #     help="A simple counter, to show something happening",
    # )

    # def resource_string(self, path):
    #     """Handy helper for getting resources from our kit."""
    #     data = pkg_resources.resource_string(__name__, path)
    #     return data.decode("utf8")

    # # TO-DO: change this view to display your data your own way.
    # def student_view(self, context=None):
    #     """
    #     The primary view of the DsdXBlock, shown to students
    #     when viewing courses.
    #     """
    #     html = self.resource_string("static/html/dsd.html")
    #     frag = Fragment(html.format(self=self))
    #     frag.add_css(self.resource_string("static/css/dsd.css"))
    #     frag.add_javascript(self.resource_string("static/js/src/dsd.js"))
    #     frag.initialize_js('DsdXBlock')
    #     # return frag
    #     return Fragment(u"Hello, world!")

    # # TO-DO: change this handler to perform your own actions.  You may need more
    # # than one handler, or you may not need any handlers at all.
    # @XBlock.json_handler
    # def increment_count(self, data, suffix=''):
    #     """
    #     An example handler, which increments the data.
    #     """
    #     # Just to show data coming in...
    #     assert data['hello'] == 'world'

    #     self.count += 1
    #     return {"count": self.count}

