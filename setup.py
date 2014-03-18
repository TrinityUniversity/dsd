"""Setup for dsd XBlock."""

import os
from setuptools import setup


def package_data(pkg, root):
    """Generic function to find package_data for `pkg` under `root`."""
    data = []
    for dirname, _, files in os.walk(os.path.join(pkg, root)):
        for fname in files:
            data.append(os.path.relpath(os.path.join(dirname, fname), pkg))

    return {pkg: data}


setup(
    name='dsd-xblock',
    version='0.1',
    description='dsd XBlock',   # TODO: write a better description.
    packages=[
        'dsd',
    ],
    install_requires=[
        'XBlock',
    ],
    entry_points={
        'xblock.v1': [
            'dsd = dsd:DsdXBlock',
        ]
    },
    package_data=package_data("dsd", "static"),
)