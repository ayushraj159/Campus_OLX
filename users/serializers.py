from rest_framework import serializers
from users.models import NewUser



class CustomUserSerializer(serializers.ModelSerializer):

    #details
    email = serializers.EmailField(required=True)
    user_name = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)
    mobile_number = serializers.IntegerField()
    department = serializers.CharField(max_length=63, default="B.Tech")
    hostel = serializers.CharField(max_length=63, default = "Siang")

    class Meta:
        model = NewUser
        fields = ('email', 'user_name', 'password', 'mobile_number', 'department', 'hostel')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        # as long as the fields are the same, we can just use this
        instance = self.Meta.model(**validated_data)
        instance.is_active = False
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

class EmailVerificationSerializer(serializers.ModelSerializer):
    token = serializers.CharField(max_length=1023)

    class Meta:
        model = NewUser
        fields = ['token']
