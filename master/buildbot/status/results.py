# This file is part of Buildbot.  Buildbot is free software: you can
# redistribute it and/or modify it under the terms of the GNU General Public
# License as published by the Free Software Foundation, version 2.
#
# This program is distributed in the hope that it will be useful, but WITHOUT
# ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
# FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more
# details.
#
# You should have received a copy of the GNU General Public License along with
# this program; if not, write to the Free Software Foundation, Inc., 51
# Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
#
# Copyright Buildbot Team Members

BEGINNING, SUCCESS, WARNINGS, FAILURE, SKIPPED, EXCEPTION, \
RETRY, CANCELED, NOT_REBUILT, DEPENDENCY_FAILURE, RESUME, \
MERGED, INTERRUPTED = range(-1, 12)

Results = ["success", "warnings", "failure", "skipped", "exception", "retry", "canceled", "not-rebuilt",
           "dependency-failure", "resume", "merged", "interrupted"]

COMPLETED_RESULTS = [
    SUCCESS, WARNINGS, FAILURE, SKIPPED, EXCEPTION, CANCELED,
    NOT_REBUILT, DEPENDENCY_FAILURE, MERGED, INTERRUPTED,
]


def worst_status(a, b):
    # SUCCESS > WARNINGS > FAILURE > EXCEPTION > RETRY
    # Retry needs to be considered the worst so that conusmers don't have to
    # worry about other failures undermining the RETRY.
    for s in (RETRY, CANCELED, INTERRUPTED, EXCEPTION, DEPENDENCY_FAILURE, FAILURE, WARNINGS, SKIPPED,
              NOT_REBUILT, SUCCESS):
        if s in (a, b):
            return s
