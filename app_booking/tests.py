from django.test import TestCase

# Create your tests here.
from mock import patch
from mock import call

def test_install_dependency(self):
    with mock_signal_receiver(post_app_install) as install_receiver:
        self.env.install(self.music_app)
        self.assertEqual(install_receiver.call_args_list, [
            call(signal=post_app_install, sender=self.env,
                app=self.ukulele_app),
            call(signal=post_app_install, sender=self.env,
                app=self.music_app),
        ])
